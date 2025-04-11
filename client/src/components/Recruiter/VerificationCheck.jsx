import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecruiterDashboard from './index';
import { useNavigate } from 'react-router-dom';

const VerificationCheck = () => {
  const [recruiterData, setRecruiterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkVerificationStatus = async () => {
      try {
        // Fix the URL path to match your server routes
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/recruiter/profile`,
          { withCredentials: true }
        );
        
        console.log('Recruiter profile data:', response.data);
        
        // Store the recruiter data in state
        setRecruiterData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recruiter profile:', error);
        setLoading(false);
        
        // Redirect to login if unauthorized
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };

    checkVerificationStatus();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If verification status is approved, directly render the RecruiterDashboard
  if (recruiterData && recruiterData.verificationStatus === 'approved') {
    return <RecruiterDashboard recruiterData={recruiterData} />;
  }

  // Show pending or rejected verification status
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="inline-flex rounded-full bg-yellow-100 p-4 mb-6">
          <svg className="h-10 w-10 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {recruiterData?.verificationStatus === 'rejected' ? 'Account Verification Rejected' : 'Account Verification Pending'}
        </h2>
        
        <p className="text-gray-600 mb-6">
          {recruiterData?.verificationStatus === 'rejected' 
            ? 'Your account verification was rejected. Please update your company details and contact support.'
            : `Thank you for registering, ${recruiterData?.name}! Your account is currently under review by our admin team.`}
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Company Details</h3>
          <p className="text-gray-800 font-medium">{recruiterData?.companyName}</p>
          {recruiterData?.companyWebsite && (
            <p className="text-blue-600 text-sm">{recruiterData.companyWebsite}</p>
          )}
          <p className="text-sm text-gray-500 mt-2">{recruiterData?.phone}</p>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={() => {
              document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
              document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
              navigate('/login');
            }}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationCheck;