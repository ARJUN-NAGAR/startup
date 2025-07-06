// auth.js
/*import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'nyayasaathi_secret_key';

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, isDeleted: false });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, role: user.role, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const router = Router();
//const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET = 'nyayasaathi_secret_key'; // Keep secret in the file directly for now

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, isDeleted: false });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token, role: user.role, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';

const router = Router();
const JWT_SECRET = 'nyayasaathi_secret_key'; // Keep consistent everywhere

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, isDeleted: false });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token, role: user.role, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;*/import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'nyayasaathi_secret_key';

// Login Route - Sets Token in HTTP-Only Cookie
router.post('/login', async (req, res) => {
  console.log("🔔 Incoming Login Request Body:", req.body);

  if (!req.body || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const { email, password } = req.body;
  console.log(`🔍 Looking for user with email: ${email}`);

  try {
    const user = await User.findOne({ email, isDeleted: false });
    console.log("✅ User Lookup Result:", user);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await user.comparePassword(password);
    console.log("🔑 Password Match:", isMatch);

    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
      secure: false, // set true in production with HTTPS
      sameSite: 'lax'
    });

    res.json({
      message: '✅ Login successful',
      role: user.role,
      token
    });
    
  } catch (err) {
    console.error("💥 Login Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Logout Route - Clears Cookie
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: '✅ Logged out successfully' });
});

// Status Route - Checks Token in Cookie
router.get('/status', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ loggedIn: false });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ loggedIn: true, user: decoded });
  } catch (err) {
    res.json({ loggedIn: false });
  }
});

export default router;
