import { Router } from 'express';
import { uploadMaterial, getMaterials, deleteMaterial } from '../controllers/marketingMaterial.controller.js';
import { verifyJWT, roleBasedAccess } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.route('/upload-material').post(
  verifyJWT,
  roleBasedAccess('MR'),
  upload.single('file'),
  uploadMaterial
);

// Changed from /fetch-materials/:userId to /fetch-materials
router.route('/fetch-materials').get(verifyJWT, getMaterials);

router.route('/:materialId').delete(
  verifyJWT,
  deleteMaterial
);

export default router;
