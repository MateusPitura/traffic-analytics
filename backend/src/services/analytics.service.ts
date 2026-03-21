import { firestore } from "../config/firestore";

const PAGE_SIZE = 20;

export const analyticsService = {
  async list(collectionName: string, lastTimestamp?: number) {
    let query = firestore
      .collection(collectionName)
      .orderBy("client.timestamp", "desc") // 🌠 maybe convert to timestamp or save already as timestamp
      .limit(PAGE_SIZE);

    // Cursor pagination
    if (lastTimestamp) {
      query = query.startAfter(lastTimestamp);
    }

    const snapshot = await query.get();

    const docs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Get next cursor
    const lastDoc = snapshot.docs[snapshot.docs.length - 1];
    const nextCursor = lastDoc ? lastDoc.get("client.timestamp") : null;

    return {
      data: docs,
      nextCursor,
      hasMore: docs.length === PAGE_SIZE,
    };
  },
};
