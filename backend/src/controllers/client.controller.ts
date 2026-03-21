import { Request, Response } from "express";
import { UpdateClientDTO } from "../dtos/client.dto";
import { clientService } from "../services/client.service";

export const createClient = async (req: Request, res: Response) => {
  try {
    const { name, color, observations } = req.body;

    if (!name || !color) {
      return res.status(400).json({
        error: "name and color are required",
      });
    }

    const client = await clientService.create({
      name,
      color,
      observations,
    });

    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const listClients = async (_req: Request, res: Response) => {
  try {
    const clients = await clientService.list();
    res.json(clients);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;
    const { name, color, observations } = req.body;

    const updateData: UpdateClientDTO = {};
    if (name) updateData.name = name;
    if (color) updateData.color = color;
    if (observations) updateData.observations = observations;

    const client = await clientService.update(clientId as string, updateData);

    res.json(client);
  } catch (error: any) {
    if (error.message === "Client not found") {
      return res.status(404).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};