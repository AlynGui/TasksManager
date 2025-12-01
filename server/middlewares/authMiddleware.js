import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/responseHandlers.js';
import * as authService from '../services/authService.js';

export const authMiddleware = async (req, res, next) => {

    const token = req.cookies?.token;

    try {
        if (!token) throw new Error('Not logged in');

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || !decoded.userId) {
            throw new Error('Invalid token payload: userId missing');
        }
        const userId = Number(decoded.userId);

        const user = await authService.getUserById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        req.user = user;

        next();

    } catch (error) {
        return errorResponse(res, 'Authentication failed', error.message);
    }
};
