import { initContract } from "@ts-rest/core";
import { analyticsContract } from "./analytics.contract";
import { clientsContract } from "./clients.contract";
import { domainsContract } from "./domains.contract";
import { sseContract } from "./sse.contract";

const c = initContract();

const contract = c.router({
  domains: domainsContract,
  clients: clientsContract,
  analytics: analyticsContract,
});

export { contract, sseContract };
