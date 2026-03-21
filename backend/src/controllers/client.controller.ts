import { Request, Response } from "express";
import { userService } from "../services/client.service";

export const getUsers = (req: Request, res: Response) => {
  const users = userService.getAll();
  res.json(users);
};