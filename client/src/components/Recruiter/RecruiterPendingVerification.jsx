import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecruiterPendingVerification = () => {
  const navigate = useNavigate();
  
  const recruiterData = JSON.parse(localStorage.getItem('recruiterData')) || {
    name: 'John Doe',
    email: 'john.doe@company.com',
    company: 'Tech Solutions Inc.'
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="bg-white shadow rounded-lg p-8 max-w-md w-full">
        <div className="flex items-center justify-center">
          <div className="bg-yellow-100 rounded-full p-3">
            <svg className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">Verification Pending</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Your account is awaiting verification by our team
        </p>
        
        <div className="mt-8">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  We're currently reviewing your company information. This typically takes 24-48 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900">Account Information</h3>
          <dl className="mt-2 divide-y divide-gray-200">
            <div className="py-3 flex justify-between">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="text-sm text-gray-900">{recruiterData.name}</dd>
            </div>
            <div className="py-3 flex justify-between">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="text-sm text-gray-900">{recruiterData.email}</dd>
            </div>
            <div className="py-3 flex justify-between">
              <dt className="text-sm font-medium text-gray-500">Company</dt>
              <dd className="text-sm text-gray-900">{recruiterData.company}</dd>
            </div>
          </dl>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900">Next Steps</h3>
          <ul className="mt-2 divide-y divide-gray-200">
            <li className="py-3 flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-3 text-sm text-gray-700">Wait for verification email</span>
            </li>
            <li className="py-3 flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-3 text-sm text-gray-700">Complete your company profile</span>
            </li>
            <li className="py-3 flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-3 text-sm text-gray-700">Post your first job</span>
            </li>
          </ul>
        </div>
        
        <div className="mt-6">
          <button 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            onClick={() => navigate('/contact-support')}
          >
            Contact Support
          </button>
        </div>
      </div>
      
      {/* For demo only - allows toggling verification status */}
      <div className="mt-8 bg-gray-100 p-4 rounded-lg">
        <p className="text-sm text-gray-500 mb-2">Demo Controls:</p>
        <div className="flex space-x-2">
          <button 
            className="py-1 px-3 bg-green-500 text-white rounded text-xs"
            onClick={() => {
              localStorage.setItem('recruiterVerified', 'approved');
              window.location.reload();
            }}
          >
            Set to Approved
          </button>
          <button 
            className="py-1 px-3 bg-red-500 text-white rounded text-xs"
            onClick={() => {
              localStorage.setItem('recruiterVerified', 'rejected');
              window.location.reload();
            }}
          >
            Set to Rejected
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterPendingVerification;