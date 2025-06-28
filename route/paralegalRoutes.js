/*import { Router } from 'express';
import { Paralegal } from '../models/index.js';
import { softDeleteById } from './helper.js';
import authMiddleware from './auth/authMiddleware.js';
const router = Router();

// Create Paralegal
router.post('/create', async (req, res) => {
  try {
    const paralegal = await Paralegal.create(req.body);
    res.status(201).json(paralegal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Paralegals
router.get('/list', async (req, res) => {
  try {
    const paralegals = await Paralegal.find();
    res.json(paralegals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Delete Paralegal by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const paralegal = await softDeleteById(Paralegal, req.params.id);
    res.json({ message: 'Paralegal soft-deleted successfully', paralegal });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;*/
import { Router } from 'express';
import { Paralegal } from '../models/index.js';
import { softDeleteById } from './helper.js';
import authMiddleware from './auth/authMiddleware.js';

const router = Router();

router.post('/create', authMiddleware, async (req, res) => {
  try {
    const paralegal = await Paralegal.create({ ...req.body, isDeleted: false });
    res.status(201).json(paralegal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/list', authMiddleware, async (req, res) => {
  try {
    const paralegals = await Paralegal.find({ isDeleted: false });
    res.json(paralegals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/delete/:id', authMiddleware, async (req, res) => {
  try {
    const paralegal = await softDeleteById(Paralegal, req.params.id);
    res.json({ message: 'Paralegal soft-deleted successfully', paralegal });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
