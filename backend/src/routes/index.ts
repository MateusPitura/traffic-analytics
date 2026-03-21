import { Router } from "express";
import {
    deleteAnalytics,
    linkAnalyticToClient,
    listAnalytics,
} from "../controllers/analytics.controller";
import {
    createClient,
    listClients,
    updateClient,
} from "../controllers/client.controller";
import { listDomains } from "../controllers/domain.controller";

const router = Router();

router.get("/domains", listDomains);

router.get("/analytics", listAnalytics);
router.delete("/analytics", deleteAnalytics);
router.post("/analytics/:domain/:analyticId/link/:clientId", linkAnalyticToClient);

router.post("/clients", createClient);
router.get("/clients", listClients);
router.put("/clients/:clientId", updateClient);

export default router;
