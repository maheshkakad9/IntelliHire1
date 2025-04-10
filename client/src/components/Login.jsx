import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') || 'general';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // Call login API with user type information
    onLogin({ email, password, userType });
  };

  // Set title and registration link based on user type
  let title = 'Login';
  let registerLink = '/register';
  let registerText = 'Sign up';
  
  if (userType === 'recruiter') {
    title = 'Recruiter Login';
    registerLink = '/recruiter/register';
    registerText = 'Register as Recruiter';
  } else if (userType === 'candidate') {
    title = 'Job Seeker Login';
    registerLink = '/candidate/register';
    registerText = 'Register as Job Seeker';
  } else if (userType === 'admin') {
    title = 'Admin Login';
    registerLink = '/admin/register';
    registerText = 'Contact Admin';
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{title}</h2>
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
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link
            to={registerLink}
            className={`${
              userType === 'recruiter' 
                ? 'text-blue-600' 
                : userType === 'candidate' 
                  ? 'text-green-600' 
                  : userType === 'admin'
                    ? 'text-gray-700'
                    : 'text-blue-500'
            } hover:underline`}
          >
            {registerText}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;