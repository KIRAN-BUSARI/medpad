import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, category } = req.body;
if ([name, price, description, category].some((field) => field?.trim() === "")) {
throw new ApiError(400, "All fields are required");
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

export const getProducts = asyncHandler(async (req, res) => {
const { page = 1, limit = 10, category, search } = req.query;
const query = {};

// Add category filter if provided
if (category) {
    query.category = category;
}

// Add search functionality
if (search) {
    query.name = { $regex: search, $options: 'i' };
}

const skip = (page - 1) * limit;

const [products, total] = await Promise.all([
    Product.find(query)
    .limit(parseInt(limit))
    .skip(skip)
    .sort({ createdAt: -1 }),
    Product.countDocuments(query)
]);

if (!products?.length) {
    throw new ApiError(404, "No products found");
}

return res.status(200).json(
    new ApiResponse(200, {
    products,
    currentPage: parseInt(page),
    totalPages: Math.ceil(total / limit),
    totalProducts: total
    }, "Products fetched successfully")
);
});
