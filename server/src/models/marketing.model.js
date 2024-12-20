import mongoose, { Schema } from "mongoose";

const MarketingMaterialSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  file: {
    type: String,
    required: true
  }, // Cloudinary URL
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, // Reference to MR
}, {
  timestamps: true
});

export const MarketingMaterial = mongoose.model('MarketingMaterial', MarketingMaterialSchema);
