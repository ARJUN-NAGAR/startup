import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();
const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'nyayasaathi_secret_key';

// Required if not already added in server.js
router.use(cookieParser());

// ✅ POST /api/auth/signup - Register user with role
router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email, isDeleted: false });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      isDeleted: false
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '2h' });

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
      secure: false,
      sameSite: 'lax'
    });

    res.status(201).json({ message: '✅ Signup successful', token, role: newUser.role });
  } catch (err) {
    console.error("💥 Signup Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST /api/auth/login - Authenticate user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

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

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
      secure: false,
      sameSite: 'lax'
    });

    res.json({ message: '✅ Login successful', role: user.role, token });
  } catch (err) {
    console.error("💥 Login Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST /api/auth/logout - Clear token cookie
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: '✅ Logged out successfully' });
});

// ✅ GET /api/auth/status - Check login status from cookie
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
