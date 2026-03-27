import { contract } from "../../../shared/src/contract";
import { initServer } from "@ts-rest/express";

import {
  deleteAnalytics,
  linkToClientAnalytics,
  listAnalytics,
} from "../controllers/analytics.controller";
import {
  createClient,
  listClients,
  updateClient,
} from "../controllers/client.controller";
import { listDomains } from "../controllers/domain.controller";

const s = initServer();

export const router = s.router(contract, {
  domains: {
    list: listDomains,
  },
  clients: {
    create: createClient,
    list: listClients,
    update: updateClient,
  },
  analytics: {
    list: listAnalytics,
    delete: deleteAnalytics,
    linkToClient: linkToClientAnalytics,
  },
});
