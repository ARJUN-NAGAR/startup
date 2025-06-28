/*import { Router } from 'express';
import { User } from '../models/index.js';

const router = Router();

router.post('/user', async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = await User.create({ name, email });
        res.status(201).send(newUser);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

export default router;
import { Router } from 'express';
import { User } from '../models/index.js';
import { softDeleteById } from './helper.js';
import authMiddleware from './auth/authMiddleware.js';
const router = Router();

router.post('/create', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/list', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const user = await softDeleteById(User, req.params.id);
    res.json({ message: 'User soft-deleted successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;*/
import { Router } from 'express';
import { User } from '../models/index.js';
import { softDeleteById } from './helper.js';
import authMiddleware from './auth/authMiddleware.js';

const router = Router();

// Create new User (Citizen registration allowed without token, others via protected panel)
router.post('/create', async (req, res) => {
  try {
    const user = await User.create({ ...req.body, isDeleted: false });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all users (Protected, shows only non-deleted users)
router.get('/list', authMiddleware, async (req, res) => {
  try {
    const users = await User.find({ isDeleted: false });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Soft delete user (Protected)
router.delete('/delete/:id', authMiddleware, async (req, res) => {
  try {
    const user = await softDeleteById(User, req.params.id);
    res.json({ message: 'User soft-deleted successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
