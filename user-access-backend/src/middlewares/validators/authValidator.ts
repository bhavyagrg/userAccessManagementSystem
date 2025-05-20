import { z } from 'zod';
import { RequestHandler } from 'express';

// Define the signup schema
export const signupSchema = z.object({
    username: z.string({ required_error: 'Username is required' }).min(3, 'Username must be at least 3 characters long'),
    password: z.string({ required_error: 'Password is required' }).min(6, 'Password must be at least 6 characters long')
});

// Middleware to validate signup request
export const validateSignup: RequestHandler = (req, res, next) => {
    try {
        signupSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ 
                errors: error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message
                }))
            });
            return;
        }
        next(error);
    }
};

// Define the login schema
export const loginSchema = z.object({
    username: z.string( { required_error: 'Username is required' }).min(3, 'Username must be at least 3 characters long'),
    password: z.string({ required_error: 'Password is required' }).min(6, 'Password must be at least 6 characters long')
});

// Middleware to validate login request
export const validateLogin: RequestHandler = (req, res, next) => {
    try {
        loginSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ 
                errors: error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message
                }))
            });
            return;
        }
        next(error);
    }
};
