import { s } from "../schemas";

const sseOnlineClientsQuery = s.object({
  domain: s.string().optional(),
});

const sseOnlineClientsResponse = s.object({
  count: s.number(),
});

export const sseContract = {
  onlineClients: {
    path: "/onlineClients",
    query: sseOnlineClientsQuery,
    responses: {
      200: sseOnlineClientsResponse,
    },
  },
};
