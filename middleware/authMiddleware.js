import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'nyayasaathi_secret_key';

const authMiddleware = (req, res, next) => {
  
  // ✅ First, Try to read token from Cookie
  let token = req.cookies?.token;

  // ✅ If not present in Cookie, Check Authorization Header
  if (!token) {
    token = req.header('Authorization')?.replace('Bearer ', '');
  }

  // ✅ Still no token? Deny Access
  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  // ✅ Verify Token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Session expired. Please log in again.' });
    }
    res.status(400).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
