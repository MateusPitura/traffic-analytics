import { contract } from "@shared/contract";
import { ServerInferRequest, ServerInferResponses } from "@ts-rest/core";
import { clientService } from "../services/client.service";

type CreateClientResponse = ServerInferResponses<
  typeof contract.clients.create
>;
type CreateClientRequest = ServerInferRequest<typeof contract.clients.create>;

export const createClient = async ({
  body,
}: CreateClientRequest): Promise<CreateClientResponse> => {
  const client = await clientService.create(body);
  return {
    status: 201,
    body: client,
  };
};

type ListClientsResponse = ServerInferResponses<typeof contract.clients.list>;

export const listClients = async (): Promise<ListClientsResponse> => {
  const clients = await clientService.list();
  return {
    status: 200,
    body: clients,
  };
};

type UpdateClientResponse = ServerInferResponses<
  typeof contract.clients.update
>;
type UpdateClientRequest = ServerInferRequest<typeof contract.clients.update>;

export const updateClient = async ({
  body,
  params,
}: UpdateClientRequest): Promise<UpdateClientResponse> => {
  try {
    const client = await clientService.update(params.clientId as string, body);

    return {
      status: 200,
      body: client,
    };
  } catch (error: any) {
    if (error.message === "Client not found") {
      return {
        status: 404,
        body: { error: error.message },
      };
    }
    throw error;
  }
};
