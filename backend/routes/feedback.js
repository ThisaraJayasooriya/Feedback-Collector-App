import express from 'express';
import Feedback from '../models/Feedback.js';

const router = express.Router();

// GET all feedback
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new feedback
router.post('/', async (req, res) => {
  const feedback = new Feedback({
    name: req.body.name,
    message: req.body.message
  });

  try {
    const newFeedback = await feedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;