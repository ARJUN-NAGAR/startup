import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  email: string;
  password: string;
  aadhaarNumber: string;
  mobile: string;
  address: string;
  gender: string;
  dob: string;
  role: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    aadhaarNumber: "",
    mobile: "",
    address: "",
    gender: "",
    dob: "",
    role: "citizen",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setServerError("");
  };

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.aadhaarNumber) newErrors.aadhaarNumber = "Aadhaar is required";
    if (!formData.mobile) newErrors.mobile = "Mobile number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    return newErrors;
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    const payload: any = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    if (formData.role === "citizen") {
      payload.aadhaarNumber = formData.aadhaarNumber;
      payload.dob = formData.dob;
      payload.mobile = formData.mobile;
      payload.address = formData.address;
      payload.gender = formData.gender;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/api/register",
        payload,
        { withCredentials: true }
      );

      if (response.data.status === "success") {
        navigate("/login");
      }
    } catch (error: any) {
      const errMsg = error?.response?.data?.message || "Something went wrong.";
      setServerError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">
        Citizen Sign Up
      </h2>

      {serverError && (
        <div className="text-red-500 text-sm mb-4 text-center">{serverError}</div>
      )}

      <form onSubmit={submitHandler} className="space-y-4">
        <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="input" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} className="input" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

        <input name="aadhaarNumber" placeholder="Aadhaar Number" value={formData.aadhaarNumber} onChange={handleChange} className="input" />
        {errors.aadhaarNumber && <p className="text-red-500 text-sm">{errors.aadhaarNumber}</p>}

        <input name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} className="input" />
        {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}

        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="input" />
        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}

        <select name="gender" value={formData.gender} onChange={handleChange} className="input">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}

        <input name="dob" type="date" value={formData.dob} onChange={handleChange} className="input" />
        {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-black text-white rounded hover:bg-gray-800"
        >
          {loading ? "Registering..." : "Register as Citizen"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
