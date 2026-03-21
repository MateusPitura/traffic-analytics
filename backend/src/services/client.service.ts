import { firestore } from "../config/firestore";
import { CLIENT_COLLECTION } from "../constants";
import { CreateClientDTO, UpdateClientDTO } from "../dtos/client.dto";

export const clientService = {
  async create(data: CreateClientDTO) {
    const docRef = firestore.collection(CLIENT_COLLECTION).doc();

    const newClient = {
      ...data,
      linkedCookieId: [],
      linkedFingerprint: [],
      linkedLocalStorageId: [],
      linkedIp: [],
      linkedHostname: [],
    };

    await docRef.set(newClient);

    return {
      id: docRef.id,
    };
  },

  async list() {
    const snapshot = await firestore.collection(CLIENT_COLLECTION).get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async update(id: string, data: UpdateClientDTO) {
    const docRef = firestore.collection(CLIENT_COLLECTION).doc(id);

    const doc = await docRef.get();

    if (!doc.exists) {
      throw new Error("Client not found");
    }

    await docRef.update({ ...data });

    return {
      id,
    };
  },
};
