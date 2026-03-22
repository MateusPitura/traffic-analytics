import { initContract } from "@ts-rest/core";
import { s } from '../schemas'

const c = initContract();

const domainsListResponse = s.object({
  domain: s.string(),
  hasUnreadAnalytics: s.boolean(),
});

export const domainsContract = c.router({
  list: {
    method: "GET",
    path: "/domains",
    responses: {
      200: s.array(domainsListResponse),
    },
  },
});
