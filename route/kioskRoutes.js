/*import { Router } from 'express';
import { Kiosk } from '../models/index.js';
import { softDeleteById } from './helper.js';
import authMiddleware from './auth/authMiddleware.js';
const router = Router();

// Create new Kiosk
router.post('/create', async (req, res) => {
  try {
    const kiosk = await Kiosk.create(req.body);
    res.status(201).json(kiosk);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all Kiosks
router.get('/list', async (req, res) => {
  try {
    const kiosks = await Kiosk.find();
    res.json(kiosks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Delete Kiosk by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const kiosk = await softDeleteById(Kiosk, req.params.id);
    res.json({ message: 'Kiosk soft-deleted successfully', kiosk });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
*/
import { Router } from 'express';
import { Kiosk } from '../models/index.js';
import { softDeleteById } from './helper.js';
import authMiddleware from './auth/authMiddleware.js';

const router = Router();

router.post('/create', authMiddleware, async (req, res) => {
  try {
    const kiosk = await Kiosk.create({ ...req.body, isDeleted: false });
    res.status(201).json(kiosk);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/list', authMiddleware, async (req, res) => {
  try {
    const kiosks = await Kiosk.find({ isDeleted: false });
    res.json(kiosks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/delete/:id', authMiddleware, async (req, res) => {
  try {
    const kiosk = await softDeleteById(Kiosk, req.params.id);
    res.json({ message: 'Kiosk soft-deleted successfully', kiosk });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
