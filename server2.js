import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from './config.js'; // Optional centralized variables

// Session Imports
import sessionMiddleware from './session/sessionConfig.js';
import sessionAuth from './session/sessionAuth.js';

// Route Imports
import userRoutes from './route/userRoutes.js';
import kioskRoutes from './route/kioskRoutes.js';
import employeeRoutes from './route/employeeRoutes.js';
import adminRoutes from './route/adminRoutes.js';
import paralegalRoutes from './route/paralegalRoutes.js';
import legalIssueRoutes from './route/legalIssueRoutes.js';
import voiceQueryRoutes from './route/voiceQueryRoutes.js';
import documentRoutes from './route/documentRoutes.js';
import subscriptionRoutes from './route/subscriptionRoutes.js';
import authRoutes from './route/auth/auth.js';  // JWT Authentication Route
import authMiddleware from './middleware/authMiddleware.js'; // Token-based protection

// App Setup
const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URL = process.env.MONGO_URL;

console.log('MONGO_URL:', MONGO_URL);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(sessionMiddleware); // Session middleware active for all routes

// MongoDB Connection
mongoose.connect(MONGO_URL)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Base Routes
app.get('/', (req, res) => {
  res.send('✅ NyayaSaathi Backend is Live. Use /api for API routes.');
});

app.get('/api', (req, res) => {
  res.send('✅ NyayaSaathi API is Ready. Use /api/{routes} to access endpoints.');
});

// Session Status Check Route
app.get('/api/session-status', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

// Protected Route Examples
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: '✅ You accessed a token-protected route!', user: req.user });
});

app.get('/api/session-protected', sessionAuth, (req, res) => {
  res.json({ message: '✅ You accessed a session-protected route!', sessionUser: req.session.user });
});

// Example Session-Based Login Route
app.post('/api/session-login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await mongoose.model('User').findOne({ email, isDeleted: false });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    req.session.user = { id: user._id, role: user.role };
    res.json({ message: '✅ Session login successful', sessionUser: req.session.user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Session Logout Route
app.post('/api/session-logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: 'Logout failed' });
    res.clearCookie('connect.sid');
    res.json({ message: '✅ Logged out successfully' });
  });
});

// API Routes with Session Protection
app.use('/api/users', sessionAuth, userRoutes);
app.use('/api/kiosks', sessionAuth, kioskRoutes);
app.use('/api/employees', sessionAuth, employeeRoutes);
app.use('/api/admins', sessionAuth, adminRoutes);
app.use('/api/paralegals', sessionAuth, paralegalRoutes);
app.use('/api/issues', sessionAuth, legalIssueRoutes);
app.use('/api/voicequeries', sessionAuth, voiceQueryRoutes);
app.use('/api/documents', sessionAuth, documentRoutes);
app.use('/api/subscriptions', sessionAuth, subscriptionRoutes);

// Auth routes (login/register) remain public
app.use('/api/auth', authRoutes);

// Server Listener
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
