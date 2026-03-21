import { Request, Response } from "express";
import { domainService } from "../services/domain.service";

export const listDomains = async (req: Request, res: Response) => {
  const collections = await domainService.list();
  res.json(collections);
};