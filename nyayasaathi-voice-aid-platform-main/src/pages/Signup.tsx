import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // or "@/lib/axiosInstance" if you’ve set that up

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "citizen",

    // Role-specific fields
    assignedDistricts: "",
    adminRole: "",
    kioskId: "",
    department: "",
    designation: "",
    permissions: "",
    phoneNumber: "",
    areasOfExpertise: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const payload: any = {
      fullName: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
    };

    // Add role-specific fields
    if (form.role === "admin") {
      payload.assignedDistricts = form.assignedDistricts;
      payload.adminRole = form.adminRole;
    } else if (form.role === "employee") {
      payload.kioskId = form.kioskId;
      payload.department = form.department;
      payload.designation = form.designation;
      payload.permissions = form.permissions;
    } else if (form.role === "paralegal") {
      payload.phoneNumber = form.phoneNumber;
      payload.areasOfExpertise = form.areasOfExpertise;
    }

    try {
      const res = await axios.post("/api/register", payload, {
        withCredentials: true,
      });
      alert("Signup Successful! Role: " + res.data.role);
      navigate("/login"); // 🔁 redirect after signup
    } catch (err: any) {
      alert("Signup failed: " + (err?.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Join NyayaSaathi
          </CardTitle>
          <CardDescription className="text-center">
            Create your account to get started
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <select
                name="role"
                className="w-full border rounded px-3 py-2"
                value={form.role}
                onChange={handleChange}
              >
                <option value="citizen">Citizen</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
                <option value="paralegal">Paralegal</option>
              </select>
            </div>

            {/* Admin Fields */}
            {form.role === "admin" && (
              <div className="space-y-2">
                <Label>Assigned Districts</Label>
                <Input
                  name="assignedDistricts"
                  placeholder="Assigned Districts"
                  value={form.assignedDistricts}
                  onChange={handleChange}
                  required
                />
                <Label>Admin Role</Label>
                <Input
                  name="adminRole"
                  placeholder="Admin Role"
                  value={form.adminRole}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {/* Employee Fields */}
            {form.role === "employee" && (
              <div className="space-y-2">
                <Label>Kiosk ID</Label>
                <Input
                  name="kioskId"
                  placeholder="Kiosk ID"
                  value={form.kioskId}
                  onChange={handleChange}
                  required
                />
                <Label>Department</Label>
                <Input
                  name="department"
                  placeholder="Department"
                  value={form.department}
                  onChange={handleChange}
                  required
                />
                <Label>Designation</Label>
                <Input
                  name="designation"
                  placeholder="Designation"
                  value={form.designation}
                  onChange={handleChange}
                  required
                />
                <Label>Permissions</Label>
                <Input
                  name="permissions"
                  placeholder="Permissions"
                  value={form.permissions}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {/* Paralegal Fields */}
            {form.role === "paralegal" && (
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  required
                />
                <Label>Areas of Expertise</Label>
                <Input
                  name="areasOfExpertise"
                  placeholder="Areas of Expertise"
                  value={form.areasOfExpertise}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Create Account
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in here
              </Link>
            </p>
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Back to Home
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
