import { Recommendation } from '../models/recommendation.model.js';

export const getRecommendations = async (req, res) => {
  try {
    const recommendations = await Recommendation.find();
    res.status(200).json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recommendations', error });
  }
};
