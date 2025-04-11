import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardOverview from './DashboardOverview';
import UserManagement from './UserManagement';
import JobManagement from './JobManagement';
import FinancialDashboard from './FinancialDashboard';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header/Nav */}
      <header className="bg-gray-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Resume Scorer Admin</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center mr-4">
              <div className="h-8 w-8 rounded-full bg-gray-600 text-white flex items-center justify-center font-medium">A</div>
              <span className="text-sm ml-2">admin@gmail.com</span>
            </div>
            <Link to="/" className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm">
              Logout
            </Link>
          </div>
        </div>
      </header>

      {/* Admin Navigation Tabs - Removed analytics, ai, settings, and system */}
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-4 font-medium text-sm ${activeTab === 'dashboard' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('users')}
              className={`px-4 py-4 font-medium text-sm ${activeTab === 'users' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              User Management
            </button>
            <button 
              onClick={() => setActiveTab('jobs')}
              className={`px-4 py-4 font-medium text-sm ${activeTab === 'jobs' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Job Management
            </button>
            <button 
              onClick={() => setActiveTab('finance')}
              className={`px-4 py-4 font-medium text-sm ${activeTab === 'finance' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Finance
            </button>
          </div>
        </div>
      </nav>

      {/* Admin Dashboard Content - Removed analytics, ai, settings, and system */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && <DashboardOverview />}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'jobs' && <JobManagement />}
        {activeTab === 'finance' && <FinancialDashboard />}
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              &copy; 2025 Resume Scorer. All rights reserved.
            </div>
            <div className="text-sm text-gray-600">
              Version 2.1.4
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;