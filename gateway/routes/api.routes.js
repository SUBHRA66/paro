/*
import { Router } from 'express';

import authProxy from '../proxy/auth.proxy.js';

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    message: 'gateway application healthy',
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

router.use("/auth", authProxy);

export default router;
*/
