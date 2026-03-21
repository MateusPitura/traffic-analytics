import { Request, Response } from "express";
import { analyticsService } from "../services/analytics.service";

export const listAnalytics = async (req: Request, res: Response) => {
  try {
    const { domain, cursor, clientId } = req.query;

    if (!domain || typeof domain !== "string") {
      return res.status(400).json({
        error: "domain query param is required",
      });
    }

    const lastTimestamp = cursor ? Number(cursor) : undefined;

    const result = await analyticsService.list(
      domain,
      lastTimestamp,
      typeof clientId === "string" ? clientId : undefined
    );

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const deleteAnalytics = async (req: Request, res: Response) => {
  try {
    const { domain } = req.query;
    const { analyticIds } = req.body;

    if (!domain || typeof domain !== "string") {
      return res.status(400).json({ error: "domain is required" });
    }

    if (!Array.isArray(analyticIds) || analyticIds.length === 0) {
      return res
        .status(400)
        .json({ error: "analyticIds must be a non-empty array" });
    }

    const result = await analyticsService.removeMany(domain, analyticIds);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const linkAnalyticToClient = async (req: Request, res: Response) => {
  try {
    const { domain, analyticId, clientId } = req.params;

    if (!domain || !analyticId || !clientId) {
      return res.status(400).json({
        error: "domain, analyticId and clientId are required",
      });
    }

    const result = await analyticsService.linkToClient(
      domain as string,
      analyticId as string,
      clientId as string
    );

    res.json(result);
  } catch (error: any) {
    if (error.message === "Document not found") {
      return res.status(404).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};
