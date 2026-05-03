import { sseContract } from "@shared/contract";
import { Request, Response } from "express";
import { sseService } from "../services/sse.service";

export const onlineClients = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { domain } = sseContract.onlineClients.query.parse(req.query);

  if (!domain) return;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const unsubscribe = sseService.onlineClients(domain, (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  });

  req.on("close", () => {
    unsubscribe();
    res.end();
  });
};
