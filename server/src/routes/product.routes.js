import { Router } from "express";
import { verifyJWT, roleBasedAccess } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"
import { createProduct } from "../controllers/product.controller.js";

const router = Router();

router.route("/create-product").post(verifyJWT,
  roleBasedAccess("ADMIN"),
  upload.single('image'),
  createProduct
)

export default router;