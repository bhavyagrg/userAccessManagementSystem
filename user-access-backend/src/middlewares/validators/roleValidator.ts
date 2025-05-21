import { RequestHandler } from 'express';
import { USER_ROLES } from '../../constants/user';

export const roleValidator = (role: USER_ROLES): RequestHandler => {
    return (req, res, next) => {
        if (req.user?.role !== role) {
            res.status(401).json({ message: 'Unauthorized user' });
            return;
        }
        next();
    };
};
