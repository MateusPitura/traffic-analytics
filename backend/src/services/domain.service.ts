import { firestore } from "../config/firestore";

export const domainService = {
  async list() {
    const collections = await firestore.listCollections();

    return collections.map((col) => col.id);
  },
};
