import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async signup(req: Request, res: Response): Promise<void> {
        try {
            const userData = req.body;
            const user = await this.authService.signup(userData);
            
            // Don't send password in response
            const { password, ...userWithoutPassword } = user;
            
            res.status(201).json({
                message: 'User created successfully',
                user: userWithoutPassword
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Error creating user',
                    error: error.message
                });
            } else {
                res.status(500).json({
                    message: 'Error creating user',
                    error: 'Unknown error occurred'
                });
            }
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const userData = req.body;
            const loginData = await this.authService.login(userData);
            
            const { jwtToken, role } = loginData;
            
            res.status(201).json({
                jwtToken: jwtToken,
                role: role,
                message: 'User logged in successfully',
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Error logging in user',
                    error: error.message
                });
            } else {
                res.status(500).json({
                    message: 'Error logging in user',
                    error: 'Unknown error occurred'
                });
            }
        }
    }
}
