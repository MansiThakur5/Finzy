import express from 'express';
import { getAnalytics } from '../controllers/analyticsController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .get(protect, getAnalytics);

export default router;
