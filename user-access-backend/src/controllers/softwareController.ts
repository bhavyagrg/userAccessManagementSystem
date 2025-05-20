import { Request, Response } from "express";
import * as softwareService from "../services/softwareService";

export const getSoftware = async (_: Request, res: Response) => {
  const all = await softwareService.getAllSoftware();
  res.json(all);
};

export const createSoftware = async (req: Request, res: Response) => {
  const software = await softwareService.addSoftware(req.body);
  res.status(201).json(software);
};
