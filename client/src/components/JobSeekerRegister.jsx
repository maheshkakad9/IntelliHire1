import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const JobSeekerRegister = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    skills: '',
    experience: '',
    education: '',
  });

  const [profilePic, setProfilePic] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const {
      name, email, password, confirmPassword,
      phone, location, skills, experience, education,
    } = formData;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    const skillsArray = skills.split(',').map(s => s.trim()).filter(Boolean);

    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    data.append('phone', phone);
    data.append('location', location);
    data.append('skills', JSON.stringify(skillsArray));
    data.append('experience', experience);
    data.append('education', education);
    if (resumeFile) data.append('resume', resumeFile);
    if (profilePic) data.append('profilePic', profilePic);

    try {
      setIsSubmitting(true);
      await axios.post(`${API_URL}/api/v1/users/register`, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("Registration successful!");
      navigate('/login?type=user');
    } catch (err) {
      console.error('Registration error:', err);
      alert("Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg my-8"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Job Seeker Account</h2>

        {/* Name */}
        <Input label="Full Name*" name="name" value={formData.name} onChange={handleChange} required />

        {/* Email */}
        <Input label="Email*" name="email" type="email" value={formData.email} onChange={handleChange} required />

        {/* Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Password*" name="password" type="password" value={formData.password} onChange={handleChange} required />
          <Input label="Confirm Password*" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required />
        </div>

        {/* Phone & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Phone*" name="phone" value={formData.phone} onChange={handleChange} required />
          <Input label="Location" name="location" value={formData.location} onChange={handleChange} />
        </div>

        {/* Skills */}
        <Input label="Skills (comma-separated)*" name="skills" value={formData.skills} onChange={handleChange} required />

        {/* Experience & Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Experience (Years)" name="experience" type="number" value={formData.experience} onChange={handleChange} />
          <div className="mb-4">
            <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">Highest Education*</label>
            <select
              id="education"
              name="education"
              value={formData.education}
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option>High School</option>
              <option>Associate's Degree</option>
              <option>Bachelor's Degree</option>
              <option>Master's Degree</option>
              <option>Doctorate</option>
            </select>
          </div>
        </div>

        {/* Profile Picture */}
        <FileInput label="Profile Picture (optional)" accept="image/*" onChange={e => handleFileChange(e, setProfilePic)} />

        {/* Resume */}
        <FileInput label="Resume (optional)" accept=".pdf,.doc,.docx" onChange={e => handleFileChange(e, setResumeFile)} />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${isSubmitting ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'} text-white py-2 px-4 rounded-lg transition duration-200`}
        >
          {isSubmitting ? 'Registering...' : 'Register as Job Seeker'}
        </button>

        {/* Links */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account? <Link to="/login?type=user" className="text-blue-500 hover:underline">Login</Link>
        </p>
        <p className="text-center text-sm text-gray-500 mt-2">
          Are you a recruiter? <Link to="/recruiter/register" className="text-blue-500 hover:underline">Register as Recruiter</Link>
        </p>
      </form>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  </div>
);

const FileInput = ({ label, accept, onChange }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type="file"
      accept={accept}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <p className="text-xs text-gray-500 mt-1">Supported formats: {accept}</p>
  </div>
);

export default JobSeekerRegister;
