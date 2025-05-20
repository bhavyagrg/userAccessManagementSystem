import express from 'express';
import { validateSignup, validateLogin } from '../middlewares/validators/authValidator';
import { AuthController } from '../controllers/authController';

const router = express.Router();

const authController = new AuthController();

router.post('/signup', validateSignup, authController.signup.bind(authController));

router.post('/login', validateLogin, authController.login.bind(authController));

export const authRoutes = router;
