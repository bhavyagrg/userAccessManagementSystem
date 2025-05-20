import { Request, Response } from "express";
import * as userService from "../services/userService";

export const getUsers = async (_: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: "Failed to create user" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const user = await userService.findUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(400).json({ message: "Invalid user ID" });
  }
};

export const getUsersByRole = async (req: Request, res: Response) => {
  try {
    const role = req.params.role;
    const users = await userService.findUsersByRole(role);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users by role" });
  }
};
