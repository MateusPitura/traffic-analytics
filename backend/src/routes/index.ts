import { Router } from "express";
import { getUsers } from "../controllers/client.controller";
import { listCollections } from "../controllers/firestore.controller";

const router = Router();

router.get("/users", getUsers);
router.get('/collections', listCollections);

export default router;
