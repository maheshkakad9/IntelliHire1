import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-blue-600">Resume Scorer</h1>
            </Link>
            <div className="ml-6 flex space-x-8">
              <Link to="/jobs" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-blue-500 text-sm font-medium">
                Jobs
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center gap-4">
              <Link to="/notifications" className="text-gray-400 hover:text-gray-500 relative">
                <span className="sr-only">Notifications</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
              </Link>
              <Link to="/messages" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Messages</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </Link>
              <div className="flex items-center">
                <img 
                  src={user.profilePicUrl} 
                  alt={user.name} 
                  className="h-8 w-8 rounded-full object-cover"
                />
              </div>
              <div className="relative ml-3">
                <button className="text-gray-500 hover:text-gray-700 flex items-center focus:outline-none">
                  <span className="sr-only">Open user menu</span>
                  <span className="hidden md:block text-sm mr-2">{user.name}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;