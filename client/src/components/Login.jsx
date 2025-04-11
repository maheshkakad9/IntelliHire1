import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') || 'general';
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Admin hardcoded login
      if (userType === 'admin' && email === 'admin@gmail.com' && password === 'admin123') {
        navigate('/admin/dashboard');
        return;
      }

      let endpoint = '';
      if (userType === 'recruiter') {
        endpoint = 'http://localhost:8000/api/v1/recruiter/login';
      } else if (userType === 'user') {
        endpoint = 'http://localhost:8000/api/v1/users/login';
      } else {
        setError('Invalid user type');
        return;
      }

      const response = await axios.post(
        endpoint,
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        // Navigate to respective dashboard
        if (userType === 'recruiter') {
          navigate('/recruiter/dashboard');
        } else if (userType === 'user') {
          navigate('/candidate/dashboard');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const getTitle = () => {
    if (userType === 'recruiter') return 'Recruiter Login';
    if (userType === 'user') return 'Job Seeker Login';
    if (userType === 'admin') return 'Admin Login';
    return 'Login';
  };

  const getButtonClass = () => {
    if (userType === 'recruiter') return 'bg-blue-600 hover:bg-blue-700';
    if (userType === 'user') return 'bg-green-600 hover:bg-green-700';
    if (userType === 'admin') return 'bg-gray-700 hover:bg-gray-800';
    return 'bg-blue-500 hover:bg-blue-600';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{getTitle()}</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className={`w-full ${getButtonClass()} text-white py-2 px-4 rounded-lg transition duration-200`}
        >
          Login
        </button>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">Don't have an account?</p>

          <div className="flex flex-col sm:flex-row justify-center gap-2">
            <Link
              to="/recruiter/register"
              className="text-blue-600 hover:bg-blue-50 border border-blue-600 px-3 py-1 rounded text-sm"
            >
              Register as Recruiter
            </Link>
            <Link
              to="/candidate/register"
              className="text-green-600 hover:bg-green-50 border border-green-600 px-3 py-1 rounded text-sm"
            >
              Register as Job Seeker
            </Link>
          </div>
        </div>

        {userType === 'admin' && (
          <p className="text-center text-xs text-gray-500 mt-4">
            Need admin access? Contact system administrator.
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
