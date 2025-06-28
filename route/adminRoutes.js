import { Router } from 'express';
import { Admin } from '../models/index.js';
import { softDeleteById } from './helper.js';
import authMiddleware from './auth/authMiddleware.js';

const router = Router();

// ✅ Add New Admin - Protected, only authenticated user can add
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const admin = await Admin.create({ ...req.body, isDeleted: false });
    res.status(201).json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get All Active Admins - Protected
router.get('/list', authMiddleware, async (req, res) => {
  try {
    const admins = await Admin.find({ isDeleted: false }).populate('user');
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Soft Delete Admin by ID - Protected
router.delete('/delete/:id', authMiddleware, async (req, res) => {
  try {
    const admin = await softDeleteById(Admin, req.params.id);

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found or already deleted' });
    }

    res.json({ message: 'Admin soft-deleted successfully', admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
