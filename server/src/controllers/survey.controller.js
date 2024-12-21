import { Survey } from '../models/survey.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

// Simple sentiment analysis function
const analyzeSentiment = (text) => {
  // List of positive and negative words
  const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'helpful', 'effective'];
  const negativeWords = ['bad', 'poor', 'terrible', 'awful', 'horrible', 'ineffective', 'useless', 'disappointing'];

  const words = text.toLowerCase().split(/\s+/);
  let positiveCount = 0;
  let negativeCount = 0;

  words.forEach(word => {
    if (positiveWords.includes(word)) positiveCount++;
    if (negativeWords.includes(word)) negativeCount++;
  });

  if (positiveCount > negativeCount) return 'Positive';
  if (negativeCount > positiveCount) return 'Negative';
  return 'Neutral';
};

export const submitSurvey = asyncHandler(async (req, res) => {
  if (!req.user?._id) {
    throw new ApiError(401, "Authentication required");
  }

  const { review } = req.body;
  const { productId } = req.query;

  // Validate required fields
  if (!review || !productId) {
    throw new ApiError(400, "Review and productId are required");
  }

  // Perform sentiment analysis
  const sentiment = analyzeSentiment(review);

  const survey = await Survey.create({
    doctorId: req.user._id,
    productReviewed: productId,
    review,
    sentiment
  });

  return res
    .status(201)
    .json(new ApiResponse(201, { survey, sentiment }, "Survey submitted successfully"));
});

export const getSurveys = asyncHandler(async (req, res) => {
  if (!req.user?._id) {
    throw new ApiError(401, "Authentication required");
  }

  const surveys = await Survey.find()
    .populate('doctorId', 'username email')
    .populate('productReviewed', 'name');

  // Calculate sentiment statistics
  const sentimentStats = {
    Positive: surveys.filter(s => s.sentiment === 'Positive').length,
    Negative: surveys.filter(s => s.sentiment === 'Negative').length,
    Neutral: surveys.filter(s => s.sentiment === 'Neutral').length,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, { surveys, sentimentStats }, "Surveys fetched successfully"));
});
