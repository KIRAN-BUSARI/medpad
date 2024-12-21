import { VideoConference } from '../models/videoConference.model.js';

// Schedule a video conference
export const scheduleConference = async (req, res) => {
  try {
    const { mrId, doctorId, meetingUrl, scheduledAt } = req.body;
    const conference = await VideoConference.create({
      mrId,
      doctorId,
      meetingUrl,
      scheduledAt
    });

    res.status(201).json({ message: 'Conference scheduled successfully', conference });
  } catch (error) {
    res.status(500).json({ message: 'Error scheduling conference', error });
  }
};

// Fetch conferences
export const getConferences = async (req, res) => {
  try {
    const conferences = await VideoConference.find().populate('mrId doctorId', 'name email');
    res.status(200).json(conferences);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching conferences', error });
  }
};
