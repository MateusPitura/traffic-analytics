import { adminDb } from "../config/firebase";

export const firestoreAdminService = {
  async listCollections() {
    const collections = await adminDb.listCollections();

    return collections.map(col => col.id);
  }
};