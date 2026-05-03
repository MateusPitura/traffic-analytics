import { sseContract } from "@shared/contract";
import { Router } from "express";
import { onlineClients } from "../controllers/see.controller";

const sseRouter = Router();

sseRouter.get(sseContract.onlineClients.path, onlineClients);

export { sseRouter };
