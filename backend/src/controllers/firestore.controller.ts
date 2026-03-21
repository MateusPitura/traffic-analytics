import { Request, Response } from "express";
import { firestoreAdminService } from "../services/firestore.service";

export const listCollections = async (req: Request, res: Response) => {
  const collections = await firestoreAdminService.listCollections();
  res.json(collections);
};