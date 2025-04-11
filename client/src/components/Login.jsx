import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') || 'general';
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setError('');

    // Admin hardcoded authentication
    if (email === 'admin@gmail.com' && password === 'admin123') {
      // Direct to admin dashboard
      navigate('/admin/dashboard');
      return;
    }

    // For other user types, call the provided onLogin function
    onLogin({ email, password, userType });
  };

  // Set title based on user type
  let title = 'Login';
  
  if (userType === 'recruiter') {
    title = 'Recruiter Login';
  } else if (userType === 'candidate') {
    title = 'Job Seeker Login';
  } else if (userType === 'admin') {
    title = 'Admin Login';
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{title}</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className={`w-full ${
            userType === 'recruiter' 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : userType === 'candidate' 
                ? 'bg-green-600 hover:bg-green-700' 
                : userType === 'admin'
                  ? 'bg-gray-700 hover:bg-gray-800'
                  : 'bg-blue-500 hover:bg-blue-600'
          } text-white py-2 px-4 rounded-lg transition duration-200`}
        >
          Login
        </button>
        
        {/* Registration options based on user type */}
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

        {/* Only show admin contact info on admin login page */}
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