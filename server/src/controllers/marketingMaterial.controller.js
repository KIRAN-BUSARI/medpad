import { MarketingMaterial } from '../models/marketing.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const uploadMaterial = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title?.trim()) {
    throw new ApiError(400, 'Title is required');
  }

  if (!req.file) {
    throw new ApiError(400, 'No file was uploaded');
  }

  const fileLocalPath = req.file.path;
  const file = await uploadOnCloudinary(fileLocalPath);

  if (!file?.url) {
    throw new ApiError(500, 'Error uploading file to cloud');
  }

  const material = await MarketingMaterial.create({
    title,
    file: file.url,
    uploadedBy: req.user._id,
    fileType: req.file.mimetype
  });

  return res.status(201).json(
    new ApiResponse(201, material, 'Material uploaded successfully')
  );
});

const getMaterials = asyncHandler(async (req, res) => {
  const userId = req.query.userId || req.user._id;

  const materials = await MarketingMaterial.find(
    { uploadedBy: userId },
    '_id title file createdAt'
  ).populate('uploadedBy', 'username email');

  return res.status(200).json(
    new ApiResponse(200, materials, 'Materials fetched successfully')
  );
});

// Add delete controller
const deleteMaterial = asyncHandler(async (req, res) => {
  const { materialId } = req.params;

  if (!materialId) {
    throw new ApiError(400, 'Material ID is required');
  }

  const material = await MarketingMaterial.findById(materialId);

  if (!material) {
    throw new ApiError(404, 'Material not found');
  }

  // Check if user owns the material or is admin
  if (material.uploadedBy.toString() !== req.user._id.toString() && req.user.role !== 'ADMIN') {
    throw new ApiError(403, 'Unauthorized to delete this material');
  }

  await MarketingMaterial.findByIdAndDelete(materialId);

  return res.status(200).json(
    new ApiResponse(200, {}, 'Material deleted successfully')
  );
});

export { uploadMaterial, getMaterials, deleteMaterial };