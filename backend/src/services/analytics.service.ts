import { FieldValue } from "firebase-admin/firestore";
import { firestore } from "../config/firestore";
import { CLIENT_COLLECTION } from "../constants";

const PAGE_SIZE = 20;

export const analyticsService = {
  async list(domainName: string, lastTimestamp?: number) {
    let query = firestore
      .collection(domainName)
      .orderBy("client.timestamp", "desc") // 🌠 // 🌠 satisfies analytics schema
      .limit(PAGE_SIZE);

    if (lastTimestamp) {
      query = query.startAfter(lastTimestamp);
    }

    const snapshot = await query.get();

    const docs = snapshot.docs.map((doc) => ({
      analyticId: doc.id,
      ...doc.data(),
    }));

    const lastDoc = snapshot.docs[snapshot.docs.length - 1];
    const nextCursor = lastDoc ? lastDoc.get("client.timestamp") : null; // 🌠 satisfies analytics schema

    return {
      data: docs,
      nextCursor,
      hasMore: docs.length === PAGE_SIZE,
    };
  },

  async removeMany(domainName: string, analyticsId: string[]) {
    const batch = firestore.batch();

    analyticsId.forEach((analyticId) => {
      const docRef = firestore.collection(domainName).doc(analyticId);
      batch.delete(docRef);
    });

    await batch.commit();

    return {
      deleted: analyticsId.length,
    };
  },

  async linkToClient(domainName: string, analyticId: string, clientId: string) {
    const analyticRef = firestore.collection(domainName).doc(analyticId);

    const clientRef = firestore.collection(CLIENT_COLLECTION).doc(clientId);

    const analyticSnap = await analyticRef.get();

    if (!analyticSnap.exists) {
      throw new Error("Analytic document not found");
    }

    const clientSnap = await clientRef.get();

    if (!clientSnap.exists) {
      throw new Error("Client not found");
    }

    const analyticsData = analyticSnap.data();
    const clientData = analyticsData?.client || {};
    const workerData = analyticsData?.worker || {};

    const batch = firestore.batch();

    batch.update(analyticRef, {
      clientId,
    });

    const updateData: any = {}; // 🌠 don't use any

    if (workerData.cookieId) {
      // 🌠 need type
      updateData.linkedCookieId = FieldValue.arrayUnion(workerData.cookieId);
    }

    if (clientData.fingerprint) {
      updateData.linkedFingerprint = FieldValue.arrayUnion(
        clientData.fingerprint
      );
    }

    if (clientData.localStorageId) {
      updateData.linkedLocalStorageId = FieldValue.arrayUnion(
        clientData.localStorageId
      );
    }

    if (workerData.ip) {
      updateData.linkedIp = FieldValue.arrayUnion(workerData.ip);
    }

    updateData.linkedHostname = FieldValue.arrayUnion(domainName);

    if (Object.keys(updateData).length > 0) {
      batch.update(clientRef, updateData);
    }

    await batch.commit();

    return {
      linked: true,
    };
  },
};
