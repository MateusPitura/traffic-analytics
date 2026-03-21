import { Router } from "express";
import { getPaginatedDocuments, listCollections } from "../controllers/firestore.controller";
import { createClient, listClients, updateClient } from "../controllers/client.controller";

const router = Router();

router.get('/collections', listCollections);
router.get("/documents", getPaginatedDocuments);

router.post("/clients", createClient);
router.get("/clients", listClients);
router.put("/clients/:id", updateClient);

export default router;
