import { Router } from 'express';
import { Employee } from '../models/index.js';
import { softDeleteById } from './helper.js';
import authMiddleware from './auth/authMiddleware.js';

const router = Router();

// ✅ Add New Employee - Protected
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.create({ ...req.body, isDeleted: false });
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get All Active Employees - Protected
router.get('/list', authMiddleware, async (req, res) => {
  try {
    const employees = await Employee.find({ isDeleted: false }).populate('user');
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Soft Delete Employee by ID - Protected
router.delete('/delete/:id', authMiddleware, async (req, res) => {
  try {
    const employee = await softDeleteById(Employee, req.params.id);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found or already deleted' });
    }

    res.json({ message: 'Employee soft-deleted successfully', employee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;