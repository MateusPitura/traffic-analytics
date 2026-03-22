import { initContract } from "@ts-rest/core";
import { s } from "../schemas";
import { errorResponse } from "./schemas";

const c = initContract();

const clientsCreateBody = s.object({
  name: s.string(),
  color: s.color(),
  observations: s.string().optional(),
});

const clientsCreateResponse = s.object({
  clientId: s.string(),
});

const clientsListResponse = clientsCreateBody.extend({
  linkedCookieId: s.array(s.string()),
  linkedFingerprint: s.array(s.string()),
  linkedLocalStorageId: s.array(s.string()),
  linkedIp: s.array(s.string()),
  linkedHostname: s.array(s.string()),
});

const clientsUpdatePathParams = s.object({
  clientId: s.string(),
});

const clientsUpdateBody = s
  .object({
    name: s.string(),
    color: s.color(),
    observations: s.string(),
  })
  .partial();

const clientUpdateResponse = clientsCreateResponse;

export const clientsContract = c.router({
  create: {
    method: "POST",
    path: "/clients",
    body: clientsCreateBody,
    responses: {
      201: clientsCreateResponse,
    },
  },
  list: {
    method: "GET",
    path: "/clients",
    responses: {
      200: s.array(clientsListResponse),
    },
  },
  update: {
    method: "PUT",
    path: "/clients/:clientId",
    pathParams: clientsUpdatePathParams,
    body: clientsUpdateBody,
    responses: {
      200: clientUpdateResponse,
      404: errorResponse,
    },
  },
});
