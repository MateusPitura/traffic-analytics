import { initContract } from "@ts-rest/core";
import { s } from "../schemas";
import { Action } from "../types";
import { errorResponse } from "./schemas";

const c = initContract();

const analyticsListQuery = s.object({
  domain: s.string(),
  cursor: s.string().optional(),
  clientId: s.string().optional(),
});

const action = s.enumeration([Action.VISIT, Action.CLICK, Action.OTHER]);

const analyticsListResponse = s.object({
  nextCursor: s.number().nullable(),
  hasMore: s.boolean(),
  payload: s.array(
    s.object({
      clientId: s.string(),
      client: s.object({
        timestamp: s.string(),
        action,
        sessionId: s.string(),
        url: s.string(),
        localStorageId: s.string(),
        referer: s.string(),
        ua: s.string(),
        timezone: s.string(),
        language: s.string(),
        innerWidth: s.string(),
        innerHeight: s.string(),
        outerWidth: s.string(),
        outerHeight: s.string(),
        dpr: s.string(),
        saveData: s.boolean(),
        type: s.string(),
        cookieEnabled: s.boolean(),
        fingerprint: s.string(),
      }),
      worker: s.object({
        cookieId: s.string(),
        timestamp: s.string(),
        url: s.string(),
        referer: s.string(),
        ua: s.string(),
        timezone: s.string(),
        language: s.string(),
        latitude: s.string(),
        longitude: s.string(),
        city: s.string(),
        region: s.string(),
        country: s.string(),
        ip: s.string(),
        asOrganization: s.string(),
        score: s.string(),
        verifiedBot: s.string(),
      }),
      events: s.array(
        s.object({
          timestamp: s.string(),
          action,
          sessionId: s.string(),
          url: s.string(),
          metadata: s.string(),
        })
      ),
    })
  ),
});

const analyticsDeleteBody = s.object({
  analyticIds: s.array(s.string(), { minItems: 1 }),
  domain: s.string(),
});

const analyticsDeleteResponse = s.object({
  deleted: s.number(),
});

const analyticsLinkToClientBody = s.object({
  domain: s.string(),
  analyticId: s.string(),
  clientId: s.string(),
});

const analyticsLinkToClientResponse = s.object({
  linked: s.boolean(),
});

export const analyticsContract = c.router({
  list: {
    method: "GET",
    path: "/analytics",
    query: analyticsListQuery,
    responses: {
      200: analyticsListResponse,
    },
  },
  delete: {
    method: "DELETE",
    path: "/analytics",
    body: analyticsDeleteBody,
    responses: {
      200: analyticsDeleteResponse,
    },
  },
  linkToClient: {
    method: "POST",
    path: "/analytics",
    body: analyticsLinkToClientBody,
    responses: {
      200: analyticsLinkToClientResponse,
      400: errorResponse,
    },
  },
});
