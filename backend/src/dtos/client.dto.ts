import { ClientsCollection } from "../../../shared/src/types/firestore";

export type CreateClientInDto = Pick<
  ClientsCollection,
  "name" | "color" | "observations"
>;

export interface CreateClientOutDto {
  clientId: string;
}

export type UpdateClientInDto = Partial<CreateClientInDto>;

export type UpdateClientOutDto = CreateClientOutDto;

export interface ListClientsOutDTO extends ClientsCollection {
  clientId: string;
}
