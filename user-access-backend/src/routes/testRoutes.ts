import express from 'express';
import { validateUser } from '../middlewares/authMiddleware';
import { Request, Response } from 'express';
import { User } from '../entities/User';
import { roleValidator } from '../middlewares/validators/roleValidator';
import { USER_ROLES } from '../constants/user';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const router = express.Router();

router.get('/test-auth-admin', validateUser, roleValidator(USER_ROLES.Admin), (req: Request, res: Response) => {
    res.json({ message: 'Server is healthy!', user: req.user });
});

router.get('/test-auth-employee', validateUser, roleValidator(USER_ROLES.Employee), (req: Request, res: Response) => {
  res.json({ message: 'Server is healthy!', user: req.user });
});

export const testRoutes = router;
