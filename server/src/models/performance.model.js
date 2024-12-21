import mongoose, { Schema } from "mongoose";

const PerformanceSchema = new Schema({
  mrId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, // Reference to MR
  testScores: [
    {
      testId: {
        type: String,
        required: true
      },
      score: {
        type: Number,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      },
    },
  ],
  overallRating: {
    type: Number,
    default: 0
  }, // Aggregated rating based on scores
});

export const Performance = mongoose.model('Performance', PerformanceSchema);
