import { Router } from 'express';
import { LegalIssue } from '../models/index.js';
import { softDeleteById } from './helper.js';
import authMiddleware from './auth/authMiddleware.js';
const router = Router();

// Create a new Legal Issue
/*router.post('/create', async (req, res) => {
  try {
    const issue = await LegalIssue.create(req.body);
    res.status(201).json(issue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all Legal Issues
router.get('/list', async (req, res) => {
  try {
    const issues = await LegalIssue.find().populate('userId', 'fullName').populate('assignedParalegal', 'name');
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Delete a Legal Issue by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const issue = await softDeleteById(LegalIssue, req.params.id);
    res.json({ message: 'Legal Issue soft-deleted successfully', issue });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});*/
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const issue = await LegalIssue.create({
      ...req.body,
      userId: req.user.userId,
      isDeleted: false
    });
    res.status(201).json(issue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/list', authMiddleware, async (req, res) => {
  try {
    const issues = await LegalIssue.find({ userId: req.user.userId, isDeleted: false });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/delete/:id', authMiddleware, async (req, res) => {
  try {
    const issue = await softDeleteById(LegalIssue, req.params.id);
    res.json({ message: 'Legal Issue soft-deleted successfully', issue });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;