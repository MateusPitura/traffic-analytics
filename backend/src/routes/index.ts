import { Router } from "express";
import { createClient, listClients, updateClient } from "../controllers/client.controller";
import { listDomains } from "../controllers/domain.controller";
import { listAnalytics } from "../controllers/analytics.controller";

const router = Router();

router.get('/domains', listDomains);

router.get("/analytics", listAnalytics);

router.post("/clients", createClient);
router.get("/clients", listClients);
router.put("/clients/:id", updateClient);

export default router;
