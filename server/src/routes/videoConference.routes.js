import express from 'express';
import { scheduleConference, getConferences } from '../controllers/videoConference.controller.js';

const router = express.Router();

router.post('/', scheduleConference);
router.get('/', getConferences);

export default router;
