import { Router } from 'express';
import { VoiceQuery } from '../models/index.js';
import { softDeleteById } from './helper.js';
import authMiddleware from './auth/authMiddleware.js';
const router = Router();
/*
// Create Voice Query
router.post('/create', async (req, res) => {
  try {
    const voiceQuery = await VoiceQuery.create(req.body);
    res.status(201).json(voiceQuery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Voice Queries
router.get('/list', async (req, res) => {
  try {
    const voiceQueries = await VoiceQuery.find().populate('issueId', 'issueType');
    res.json(voiceQueries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Delete Voice Query by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const query = await softDeleteById(VoiceQuery, req.params.id);
    res.json({ message: 'Voice Query soft-deleted successfully', query });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;*/

router.post('/create', authMiddleware, async (req, res) => {
  try {
    const voiceQuery = await VoiceQuery.create({
      ...req.body,
      userId: req.user.userId,
      isDeleted: false
    });
    res.status(201).json(voiceQuery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/list', authMiddleware, async (req, res) => {
  try {
    const voiceQueries = await VoiceQuery.find({ userId: req.user.userId, isDeleted: false });
    res.json(voiceQueries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/delete/:id', authMiddleware, async (req, res) => {
  try {
    const query = await softDeleteById(VoiceQuery, req.params.id);
    res.json({ message: 'Voice Query soft-deleted successfully', query });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
