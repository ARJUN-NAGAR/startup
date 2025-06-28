import { Router } from 'express';
import { Submission } from '../models/index.js';
import authMiddleware from './auth/authMiddleware.js';
import { softDeleteById } from './helper.js';

const router = Router();

router.post('/create', authMiddleware, async (req, res) => {
  try {
    const submission = await Submission.create({
      ...req.body,
      submittedBy: req.user.userId,
      isDeleted: false
    });
    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/list', authMiddleware, async (req, res) => {
  try {
    const submissions = await Submission.find({ isDeleted: false })
      .populate('documentId', 'documentType')
      .populate('submittedBy', 'fullName');
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/delete/:id', authMiddleware, async (req, res) => {
  try {
    const submission = await softDeleteById(Submission, req.params.id);
    res.json({ message: 'Submission soft-deleted successfully', submission });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
