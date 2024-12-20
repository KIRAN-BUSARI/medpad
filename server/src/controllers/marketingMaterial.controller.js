import { MarketingMaterial } from '../models/marketing.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const uploadMaterial = asyncHandler(async (req, res) => {
  console.log('Request Body:', req.body);
  console.log('File:', req.file);

  const { title } = req.body;

  // Validate required fields
  if (!title?.trim()) {
    throw new ApiError(400, 'Missing title', 'Title is required');
  }

  // Validate file upload
  if (!req.file) {
    throw new ApiError(400, 'File upload error', 'No file was uploaded');
  }

  // Validate file type if needed
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (!allowedTypes.includes(req.file.mimetype)) {
    throw new ApiError(400, 'Invalid file type', 'Only JPEG, PNG and PDF files are allowed');
  }

  const fileLocalPath = req.file.path;
  console.log('File Local Path:', fileLocalPath);

  if (!fileLocalPath) {
    throw new ApiError(500, 'Error uploading material', 'File path not found');
  }

  const file = await uploadOnCloudinary(fileLocalPath);

  if (!file) {
    throw new ApiError(500, 'Error uploading material', 'File not uploaded on cloudinary')
  }

  const material = await MarketingMaterial.create({
    title,
    file: file.url,
    uploadedBy: req.user._id
  });
  console.log(material);

  res.status(201).json(
    new ApiResponse(200, material, 'Material uploaded successfully')
  );
});

// Fetch all marketing materials
const getMaterials = async (req, res) => {
  try {
    const materials = await MarketingMaterial.find().populate('uploadedBy', 'name email');
    res.status(200).json(
      new ApiResponse(200, materials, 'Materials fetched successfully')
    );
  } catch (error) {
    res.status(500).json(
      new ApiError(500, 'Error fetching materials', error));
  }
};

export { uploadMaterial, getMaterials };