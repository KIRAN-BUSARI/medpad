import { Router } from 'express';
import { uploadMaterial, getMaterials } from '../controllers/marketingMaterial.controller.js';
import { verifyJWT, roleBasedAccess } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.route('/upload-material').post(
  verifyJWT,
  roleBasedAccess('MR'),
  upload.single('file'),
  uploadMaterial
);
router.route('/fetch-materials').get(verifyJWT, getMaterials);

export default router;
