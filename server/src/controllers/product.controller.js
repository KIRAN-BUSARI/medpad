import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, category } = req.body;
  if ([name, price, description, category].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required")
  }

  const productImageLocalPath = req.file.path;

  if (!productImageLocalPath) {
    throw new ApiError(400, "File not found")
  }

  const productImg = await uploadOnCloudinary(productImageLocalPath);

  if (!productImg) {
    throw new ApiError(400, "Error uploading product Image")
  }

  const product = await Product.create({
    name,
    description,
    price,
    category,
    image: productImg.url
  })

  res.status(201).json(
    new ApiResponse(201, product, "Product created successfully")
  )

})