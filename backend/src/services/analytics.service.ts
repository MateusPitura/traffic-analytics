import { Path } from "../../../shared/src/types";
import { ClientsCollection, DomainsCollection } from "../../../shared/src/types/firestore";
import { FieldValue, Query } from "firebase-admin/firestore";
import { firestore } from "../config/firestore";
import { CLIENT_COLLECTION } from "../constants";
import {
  LinkToClientOutDto,
  ListAnalyticsOutDto,
  RemoveManyAnalyticsOutDto,
} from "../dtos/analytics.dto";

const PAGE_SIZE = 20;
const LIST_QUERY_WHERE: Path<DomainsCollection> = "clientId";
const LIST_QUERY_SORT: Path<DomainsCollection> = "client.timestamp";

export const analyticsService = {
  async list(
    domainName: string,
    lastTimestamp?: string,
    clientId?: string
  ): Promise<ListAnalyticsOutDto> {
    let query: Query = firestore.collection(domainName);

    if (clientId) {
      query = query.where(LIST_QUERY_WHERE, "==", clientId);
    }

    query = query.orderBy(LIST_QUERY_SORT, "desc").limit(PAGE_SIZE);

    if (lastTimestamp) {
      query = query.startAfter(lastTimestamp);
    }

    const snapshot = await query.get();

    const docs = snapshot.docs.map((doc) => ({
      analyticId: doc.id,
      ...(doc.data() as DomainsCollection),
    }));

    const lastDoc = snapshot.docs[snapshot.docs.length - 1];
    const nextCursor = lastDoc ? lastDoc.get(LIST_QUERY_SORT) : null;

    return {
      payload: docs,
      nextCursor,
      hasMore: docs.length === PAGE_SIZE,
    };
  },

  async removeMany(
    domainName: string,
    analyticsId: string[]
  ): Promise<RemoveManyAnalyticsOutDto> {
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

  async linkToClient(
    domainName: string,
    analyticId: string,
    clientId: string
  ): Promise<LinkToClientOutDto> {
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

    const analyticsData = analyticSnap.data() as DomainsCollection;
    const clientData = analyticsData?.client || {};
    const workerData = analyticsData?.worker || {};

    const batch = firestore.batch();

    batch.update(analyticRef, {
      clientId,
    });

    const updateData: Partial<Record<keyof ClientsCollection, FieldValue>> = {};

    if (workerData.cookieId) {
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
