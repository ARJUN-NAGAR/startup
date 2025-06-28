import { Router } from 'express';
import Subscription from '../models/Subscription.js';
import { softDeleteById } from './helper.js';
import authMiddleware from './auth/authMiddleware.js';

const router = Router();

router.post('/create', authMiddleware, async (req, res) => {
  try {
    const subscription = await Subscription.create({ ...req.body, isDeleted: false });
    res.status(201).json(subscription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/list', authMiddleware, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ isDeleted: false }).populate('organizationRef');
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/delete/:id', authMiddleware, async (req, res) => {
  try {
    const subscription = await softDeleteById(Subscription, req.params.id);
    res.json({ message: 'Subscription soft-deleted successfully', subscription });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
