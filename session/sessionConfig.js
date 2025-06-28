import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config();

const sessionMiddleware = session({
  secret: process.env.JWT_SECRET || 'nyayasaathi_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 2 * 60 * 60 * 1000, // 2 hours
    secure: false,              // Should be true if using HTTPS in production
    httpOnly: true,
    sameSite: 'lax'             // Helps with cookies working in Postman & cross-origin safety
  }
});

export default sessionMiddleware;
