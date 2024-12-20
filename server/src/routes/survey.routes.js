import { Router } from 'express';
import { submitSurvey, getSurveys } from '../controllers/survey.controller.js';
import { verifyJWT, roleBasedAccess } from '../middlewares/auth.middleware.js';
const router = Router();

router.post('/submit-survey', verifyJWT, roleBasedAccess("DOCTOR"), submitSurvey);
router.get('/get-surveys', verifyJWT, getSurveys);

export default router;
