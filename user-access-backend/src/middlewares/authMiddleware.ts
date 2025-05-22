import { RequestHandler, Request } from "express";
import jwt from "jsonwebtoken";
import { UserDao } from "../dao/userDao";

import { User } from "../../src/entities/User";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}

const userDao = new UserDao();

export const validateUser: RequestHandler = async (req: Request, res, next) => {
  try {
    const token = req.headers.token as string;
    if (!token) {
      throw new Error("Authentication token missing");
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as { username: string };

    const user = await userDao.findUserByUsername(decodedToken.username);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({
        message: error.message,
      });
      return;
    }
    next(error);
  }
};
