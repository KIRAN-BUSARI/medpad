import mongoose, { Schema } from "mongoose";
const VideoConferenceSchema = new Schema({
  mrId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, // Reference to MR
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, // Reference to Doctor
  meetingUrl: {
    type: String,
    required: true
  }, // Video conferencing URL
  scheduledAt: {
    type: Date,
    required: true
  }, // Scheduled time
  completed: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
});

export const VideoConference = mongoose.model('VideoConference', VideoConferenceSchema);
