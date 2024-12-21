import express from 'express';
import { addTestScore, getPerformance } from '../controllers/performance.controller.js';

const router = express.Router();

router.post('/', addTestScore);
router.get('/:mrId', getPerformance);

export default router;
