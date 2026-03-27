import { ClientsCollection } from "../../../shared/src/types/firestore";
import { firestore } from "../config/firestore";
import { CLIENT_COLLECTION } from "../constants";
import { CreateClientInDto, CreateClientOutDto, ListClientsOutDTO, UpdateClientInDto, UpdateClientOutDto } from "../dtos/client.dto";

export const clientService = {
  async create(data: CreateClientInDto): Promise<CreateClientOutDto> {
    const docRef = firestore.collection(CLIENT_COLLECTION).doc();

    const newClient: ClientsCollection = {
      ...data,
      linkedCookieId: [],
      linkedFingerprint: [],
      linkedLocalStorageId: [],
      linkedIp: [],
      linkedHostname: [],
    };

    await docRef.set(newClient);

    return {
      clientId: docRef.id,
    };
  },

  async list(): Promise<ListClientsOutDTO[]> {
    const snapshot = await firestore.collection(CLIENT_COLLECTION).get();

    return snapshot.docs.map((doc) => ({
      clientId: doc.id,
      ...doc.data() as ClientsCollection,
    }));
  },

  async update(clientId: string, data: UpdateClientInDto): Promise<UpdateClientOutDto> {
    const docRef = firestore.collection(CLIENT_COLLECTION).doc(clientId);

    const doc = await docRef.get();

    if (!doc.exists) {
      throw new Error("Client not found");
    }

    await docRef.update({ ...data });

    return {
      clientId,
    };
  },
};
