import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as authService from '../services/authService.js';
import { successResponse, errorResponse } from '../utils/responseHandlers.js';

/* Login Controller */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            throw new Error('Email and password are required');

        const user = await authService.getUserByEmail(email);
        if (!user)
            throw new Error('User not found');

        const valid = await bcrypt.compare(password, user.password);
        if (!valid)
            throw new Error('Invalid password');

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax'
        });
        return successResponse(res, 'Login success', { id: user.id, username: user.username, email: user.email });

    } catch (error) {
        return errorResponse(res, 'Login failed', error.message);
    }
};

/* Register Controller */
export const register = async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password)
        throw new Error('Username, email and password are required');

    try {
        // Check for existing user by email or username
        const existingUser = await authService.getUserByEmail(email);

        if (existingUser) {
            throw new Error('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await authService.createUser({
            username,
            email,
            password: hashedPassword
        });

        return successResponse(res, 'User created', { id: user.id, username: user.username, email: user.email });

    } catch (error) {
        return errorResponse(res, 'Registration failed', error.message);
    }

};

/* Logout Controller */
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax'
        });

        return successResponse(res, 'Logout success');
    } catch (error) {
        return errorResponse(res, 'Logout failed', error.message);
    }
};

/* Reset Password Controller */
export const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) throw new Error('Email and new password are required');

        const user = await authService.getUserByEmail(email);
        if (!user) throw new Error('User not found');

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await authService.updateUserPassword(user.id, hashedPassword);

        return successResponse(res, 'Password changed successfully');

    } catch (error) {
        return errorResponse(res, 'Failed to change password', error.message);
    }
};

/* Get Current User Controller */
export const getCurrentUser = async (req, res) => {
    try {
        const user = req.user;
        return successResponse(res, 'User fetched successfully', { id: user.id, username: user.username, email: user.email });
    } catch (error) {
        return errorResponse(res, 'Failed to fetch user', error.message);
    }
};  