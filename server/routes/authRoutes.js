import express from 'express';
import {
    login,
    register,
    logout,
    resetPassword,
    getCurrentUser
} from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();


router.post('/login', login);
router.post('/register', register);
router.post('/forgot-password', resetPassword);
router.delete('/logout', authMiddleware, logout);
router.get('/me', authMiddleware, getCurrentUser);

export default router;
