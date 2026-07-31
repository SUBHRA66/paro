import { Router } from 'express';
import AuthController from '../controllers/auth.js';
import AuthMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.get('/me', AuthMiddleware.ensureAuthenticated, AuthController.getMe);

export default router;
