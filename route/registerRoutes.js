// routes/register.js
import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from '../models/User.js';
import Admin from '../models/Admin.js';
import Employee from '../models/employee.js';
import Paralegal from '../models/Paralegal.js';


dotenv.config();
const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'nyayasaathi_secret_key';

router.post('/register', async (req, res) => {
  const { fullName, email, password, role } = req.body;

  if (!fullName || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email, isDeleted: false });
    if (existingUser) return res.status(409).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
      isDeleted: false,
      isProfileComplete: false
    });

    await newUser.save();

    // 🔁 Role-specific handling
    switch (role) {
      case 'admin':
        const { assignedDistricts, adminRole } = req.body;
        if (!assignedDistricts || !adminRole) return res.status(400).json({ message: 'Admin fields missing' });

        await Admin.create({
          user: newUser._id,
          assignedDistricts,
          adminRole
        });
        break;

      case 'employee':
        const { kioskId, department, designation, permissions } = req.body;
        if (!kioskId || !department || !designation || !permissions) {
          return res.status(400).json({ message: 'Employee fields missing' });
        }

        await Employee.create({
          user: newUser._id,
          kioskId,
          department,
          designation,
          permissions
        });
        break;

      case 'paralegal':
        const { phoneNumber, areasOfExpertise } = req.body;
        if (!phoneNumber || !areasOfExpertise) {
          return res.status(400).json({ message: 'Paralegal fields missing' });
        }

        await Paralegal.create({
          user: newUser._id,
          phoneNumber,
          areasOfExpertise
        });
        break;

      // citizen handled already in User model, no extra model needed
    }

    // 🔐 Generate JWT and return
    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '2h' });

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
      secure: false,
      sameSite: 'lax'
    });

    res.status(201).json({ message: '✅ Signup successful', token, role: newUser.role });

  } catch (err) {
    console.error('💥 Registration Error:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
