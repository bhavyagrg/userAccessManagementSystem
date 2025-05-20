import { Request, Response } from "express";
import * as accessService from "../services/accessRequestService";

export const getRequests = async (_: Request, res: Response) => {
  const requests = await accessService.getAllRequests();
  res.json(requests);
};

export const addRequest = async (req: Request, res: Response) => {
  try {
    const softwareId = req.body.softwareId;
    const userId = req.body.userId;

    const request = await accessService.createAccessRequest(userId, softwareId);
    res.status(201).json(request);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
};

export const approveOrReject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updated = await accessService.updateRequestStatus(Number(id), status);
    res.json(updated);
  } catch (err) {
    const error = err as Error;
    res.status(404).json({ error: error.message });
  }
};
