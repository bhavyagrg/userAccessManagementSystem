import { Request, Response } from "express";
import * as softwareService from "../services/softwareService";

export const getAllSoftwares = async (_: Request, res: Response) => {
  const all = await softwareService.getAllSoftware();
  res.json(all);
};

export const createSoftware = async (req: Request, res: Response) => {
  const software = await softwareService.addSoftware(req.body);
  res.status(201).json(software);
};

export const getSoftwareById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const software = await softwareService.getSoftwareById(id);
  if (software) {
    res.json(software);
  } else {
    res.status(404).json({ message: "Software not found" });
  }
};

export const deleteSoftware = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await softwareService.deleteSoftware(id);
  res.status(204).send();
};
