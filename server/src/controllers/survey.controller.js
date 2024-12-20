import { Survey } from '../models/survey.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const submitSurvey = asyncHandler(async (req, res) => {
  // Check if user is authenticated
  if (!req.user?._id) {
    throw new ApiError(401, "Authentication required");
  }

  const { review, sentiment } = req.body;
  const { productId } = req.query;

  // Validate required fields
  if (!review || !sentiment || !productId) {
    throw new ApiError(400, "Review, sentiment and productId are required");
  }

  // Validate sentiment value
  const validSentiments = ['Positive', 'Negative', 'Neutral'];
  if (!validSentiments.includes(sentiment)) {
    throw new ApiError(400, "Invalid sentiment value. Must be Positive, Negative, or Neutral");
  }

  const survey = await Survey.create({
    doctorId: req.user._id,
    productReviewed: productId,
    review,
    sentiment
  });

  return res
    .status(201)
    .json(new ApiResponse(201, survey, "Survey submitted successfully"));
});

export const getSurveys = asyncHandler(async (req, res) => {
  const surveys = await Survey.find().populate('doctorId', 'name email');
  return res
    .status(200)
    .json(new ApiResponse(200, surveys, "Surveys fetched successfully"));
});
