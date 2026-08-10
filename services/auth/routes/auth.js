import { Router } from 'express';
import AuthController from '../controllers/auth.js';
import AuthMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.get('/health', (req, res) => {
	res.status(200).json({
		service: 'auth service',
		status: 'ok',
		timestamp: new Date().toISOString(),
	});
});

router.post('/login', AuthController.login);

router.post('/signup', AuthController.signup);

router.post('/logout', AuthMiddleware.ensureAuthenticated, AuthController.logout);

export default router;
