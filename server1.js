import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config.js';

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
import citizenRoutes from './route/citizensRoutes.js';
import authRoutes from './route/auth/auth.js';
import authMiddleware from './middleware/authMiddleware.js';

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URL = process.env.MONGO_URL;

console.log('🌐 MONGO_URL:', MONGO_URL);

// ✅ Updated CORS Setup to Allow Local, Render, and Postman
const allowedOrigins = [
  'http://localhost:3000',              // Local frontend
  'https://startup-47ex.onrender.com',  // Render deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true
}));

// ✅ JSON Body Parser and Cookie Parser
app.use(express.json());
app.use(cookieParser());

// ✅ MongoDB Connection with Updated Connection String
mongoose.connect(MONGO_URL)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Basic Routes
app.get('/', (req, res) => {
  res.send('✅ NyayaSaathi Backend is Live. Use /api for API routes.');
});

app.get('/api', (req, res) => {
  res.send('✅ NyayaSaathi API is Ready. Use /api/{routes} to access endpoints.');
});

// ✅ Protected Route with JWT Middleware
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: '✅ You accessed a protected route!', user: req.user });
});

// ✅ All API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/kiosks', kioskRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/paralegals', paralegalRoutes);
app.use('/api/issues', legalIssueRoutes);
app.use('/api/voicequeries', voiceQueryRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/citizens', citizenRoutes);

// ✅ Server Listener
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
