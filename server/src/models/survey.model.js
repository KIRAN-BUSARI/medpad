import mongoose, { Schema } from 'mongoose';

const SurveySchema = new Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, // Reference to Doctor
  productReviewed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  review: {
    type: String,
    required: true
  },
  sentiment: {
    type: String, enum: ['Positive', 'Negative', 'Neutral'],
    default: 'Neutral'
  },
}, {
  timestamps: true
});

export const Survey = mongoose.model('Survey', SurveySchema);