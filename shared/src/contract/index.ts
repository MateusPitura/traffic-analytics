import { initContract } from "@ts-rest/core";
import { analyticsContract } from "./analytics.contract";
import { clientsContract } from "./clients.contract";
import { domainsContract } from "./domains.contract";

const c = initContract();

export const contract = c.router({
  domains: domainsContract,
  clients: clientsContract,
  analytics: analyticsContract
});
