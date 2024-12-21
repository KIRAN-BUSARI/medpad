import mongoose, { Schema } from "mongoose";

const RecommendationSchema = new Schema({
  productId: {
    type: String,
    required: true
  }, // Product being recommended
  region: {
    type: String,
    required: true
  },
  recommendedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, // Reference to MR
}, {
  timestamps: true
});

export const Recommendation = mongoose.model('Recommendation', RecommendationSchema);
