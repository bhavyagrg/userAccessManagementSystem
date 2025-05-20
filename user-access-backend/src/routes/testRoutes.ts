import express from 'express';
import { validateUser } from '../middlewares/authMiddleware';
import { Request, Response } from 'express';
import { User } from '../entities/User';

// Extend Express Request type with our custom properties
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const router = express.Router();

router.get('/test-auth', validateUser, (req: Request, res: Response) => {
    res.json({ message: 'Server is healthy!', user: req.user });
});

export const testRoutes = router;
