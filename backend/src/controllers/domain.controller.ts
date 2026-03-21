import { Request, Response } from "express";
import { domainService } from "../services/domain.service";

export const listDomains = async (req: Request, res: Response) => {
  const domains = await domainService.list();
  res.json(domains);
};