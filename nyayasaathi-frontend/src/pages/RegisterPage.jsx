// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    aadhaarNumber: '',
    role: 'citizen',
    assignedDistricts: '',
    adminRole: 'DistrictAdmin',
    kioskId: '',
    department: '',
    designation: '',
    permissions: {
      formProcessing: false,
      caseEscalation: false,
    },
    phoneNumber: '',
    areasOfExpertise: []
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes("permissions.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        permissions: { ...prev.permissions, [key]: checked },
      }));
    } else if (name === "areasOfExpertise") {
      const values = Array.from(e.target.selectedOptions, option => option.value);
      setFormData({ ...formData, [name]: values });
    } else {
      setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await api.post('/register', formData);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit}>
          {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}
          {success && <p className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</p>}

          <input name="fullName" placeholder="Full Name" onChange={handleChange} required className="input" />
          <input name="email" placeholder="Email" type="email" onChange={handleChange} required className="input" />
          <input name="password" placeholder="Password" type="password" onChange={handleChange} required className="input" />
          <input name="aadhaarNumber" placeholder="Aadhaar Number (12 digits)" pattern="\d{12}" onChange={handleChange} className="input" />

          <label className="block text-sm font-semibold mt-4">Select Role</label>
          <select name="role" value={formData.role} onChange={handleChange} className="input">
            <option value="citizen">Citizen</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
            <option value="paralegal">Paralegal</option>
          </select>

          {formData.role === 'admin' && (
            <>
              <input name="assignedDistricts" placeholder="Assigned Districts (comma-separated)" onChange={handleChange} className="input" />
              <select name="adminRole" onChange={handleChange} className="input">
                <option value="DistrictAdmin">DistrictAdmin</option>
                <option value="SuperAdmin">SuperAdmin</option>
                <option value="KioskAdmin">KioskAdmin</option>
                <option value="DataEntryOperator">DataEntryOperator</option>
              </select>
            </>
          )}

          {formData.role === 'employee' && (
            <>
              <input name="kioskId" placeholder="Kiosk ID" onChange={handleChange} className="input" />
              <input name="department" placeholder="Department" onChange={handleChange} className="input" />
              <input name="designation" placeholder="Designation" onChange={handleChange} className="input" />
              <label className="block mt-2">Permissions:</label>
              <label><input type="checkbox" name="permissions.formProcessing" onChange={handleChange} /> Form Processing</label>
              <label><input type="checkbox" name="permissions.caseEscalation" onChange={handleChange} /> Case Escalation</label>
            </>
          )}

          {formData.role === 'paralegal' && (
            <>
              <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} className="input" />
              <label className="block mt-2">Areas of Expertise</label>
              <select name="areasOfExpertise" multiple onChange={handleChange} className="input">
                <option value="Aadhaar">Aadhaar</option>
                <option value="Pension">Pension</option>
                <option value="Land">Land</option>
                <option value="Certificates">Certificates</option>
                <option value="Fraud">Fraud</option>
                <option value="Court">Court</option>
                <option value="Welfare">Welfare</option>
              </select>
            </>
          )}

          <button type="submit" className="w-full mt-6 bg-brand-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-secondary">
            Register
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-brand-primary font-bold hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;