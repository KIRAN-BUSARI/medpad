import { Performance } from '../models/performance.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from "../utils/asyncHandler.js";

export const addTestScore = async (req, res) => {
  try {
    const { mrId, testId, score } = req.body;

    if (!mrId || !testId || !score) {
      throw new ApiError(400, 'Missing required fields');
    }

    if (score < 0 || score > 100) {
      throw new ApiError(400, 'Invalid score. Must be between 0 and 100');
    }

    const existingScore = await Performance.findOne({
      mrId,
      testScores: { $elemMatch: { testId } }
    });

    if (existingScore) {
      throw new ApiError(400, 'Test score already exists');
    }

    const performance = await Performance.findOne({ mrId });

    if (!performance) {
      performance = new Performance({
        mrId,
        testScores: []
      });
    }

    performance.testScores.push({ testId, score });
    performance.overallRating =
      performance.testScores.reduce((sum, test) => sum + test.score, 0) / performance.testScores.length;

    await performance.save();

    res.status(201).json(
      new ApiResponse(200, performance, 'Test score added successfully')
    );
  } catch (error) {
    new ApiError(500, 'Error adding test score', error)
  }
};

// Fetch performance data
export const getPerformance = async (req, res) => {
  try {
    const { mrId } = req.params;
    const performance = await Performance.findOne(
      {
        mrId
      }
    ).populate('mrId', 'name email');
    if (!performance) return res.status(404).json({ message: 'Performance not found' });

    res.status(200).json(performance);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching performance data', error });
  }
};
