import { firestore } from "../config/firestore";
import { CLIENT_COLLECTION } from "../constants";

export const domainService = {
  async list() {
    const collections = await firestore.listCollections();

    const filteredCollections = collections.filter((col) => col.id !== CLIENT_COLLECTION);

    const results = await Promise.all(
      filteredCollections.map(async (col) => {
        const snapshot = await col
          .orderBy("client.timestamp", "desc")// 🌠 satisfies analytics schema
          .limit(1)
          .get();

        if (snapshot.empty) {
          return {
            domain: col.id,
            hasUnreadAnalytics: false,
          };
        }

        const doc = snapshot.docs[0];
        const data = doc.data();

        const hasUnreadAnalytics = !data.clientId;

        return {
          domain: col.id,
          hasUnreadAnalytics,
        };
      })
    );

    return results;
  },
};
