import { Request, Response } from "express";
import { analyticsService } from "../services/analytics.service";

export const listAnalytics = async (
  req: Request,
  res: Response
) => {
  try {
    const { collection, cursor } = req.query;

    if (!collection || typeof collection !== "string") {
      return res.status(400).json({
        error: "collection query param is required",
      });
    }

    const lastTimestamp = cursor
      ? Number(cursor)
      : undefined;

    const result =
      await analyticsService.list(
        collection,
        lastTimestamp
      );

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};