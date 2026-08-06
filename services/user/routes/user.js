import { Router } from 'express';
import UserController from '../controllers/user.js';
import AuthMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    service: 'user',
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

router.post('/', UserController.createUser);

// Protected routes (require JWT authorization)
router.use(AuthMiddleware.authenticate);

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
