import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecruiterDashboard from '../components/Recruiter';
import RecruiterPendingVerification from '../components/Recruiter/RecruiterPendingVerification';

const RecruiterDashboardPage = () => {
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('pending');
  const [loading, setLoading] = useState(true);

  // Get recruiter data from localStorage
  const getRecruiterData = () => {
    try {
      const recruiterData = localStorage.getItem('recruiterData');
      return recruiterData ? JSON.parse(recruiterData) : {
        name: 'John Doe',
        email: 'john.doe@company.com',
        company: 'Tech Solutions Inc.',
        verified: false
      };
    } catch (error) {
      console.error('Error parsing recruiter data:', error);
      return {};
    }
  };

  useEffect(() => {
    // Simulate checking verification status
    const checkVerification = () => {
      const recruiterData = getRecruiterData();
      
      // For demo: Add a button to localStorage to toggle verification status
      if (!localStorage.getItem('hasVerificationToggle')) {
        localStorage.setItem('hasVerificationToggle', 'true');
        
        // Add verification control to localStorage
        localStorage.setItem('recruiterVerified', 'pending');
        
        // Add mock job postings for demo
        if (!localStorage.getItem('mockJobPostings')) {
          const mockJobs = [
            {
              id: '1',
              title: 'Frontend Developer',
              location: 'Mumbai',
              description: 'We are looking for a skilled frontend developer...',
              skillsRequired: ['React', 'JavaScript', 'HTML', 'CSS'],
              experienceRequired: '2-3 years',
              salaryRange: '₹10-15 LPA',
              postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
              applications: [
                {
                  id: 'app1',
                  candidateId: 'c1',
                  candidateName: 'Priya Sharma',
                  candidateEmail: 'priya.sharma@example.com',
                  appliedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                  status: 'Applied',
                  matchScore: 92,
                  resumeUrl: 'https://example.com/resumes/priya.pdf'
                },
                {
                  id: 'app2',
                  candidateId: 'c2',
                  candidateName: 'Rahul Patel',
                  candidateEmail: 'rahul.patel@example.com',
                  appliedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                  status: 'Screening',
                  matchScore: 78,
                  resumeUrl: null
                }
              ]
            },
            {
              id: '2',
              title: 'UI/UX Designer',
              location: 'Bangalore',
              description: 'Looking for a creative UI/UX designer...',
              skillsRequired: ['Figma', 'Adobe XD', 'User Research'],
              experienceRequired: '1-2 years',
              salaryRange: '₹8-12 LPA',
              postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
              applications: []
            }
          ];
          localStorage.setItem('mockJobPostings', JSON.stringify(mockJobs));
        }
      }
      
      // Get current verification status
      const currentStatus = localStorage.getItem('recruiterVerified') || 'pending';
      setVerificationStatus(currentStatus);
      setLoading(false);
    };

    checkVerification();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show appropriate screen based on verification status
  if (verificationStatus === 'pending') {
    return <RecruiterPendingVerification />;
  } else if (verificationStatus === 'rejected') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
        <div className="bg-white shadow rounded-lg p-8 max-w-md w-full">
          <div className="flex items-center justify-center">
            <div className="bg-red-100 rounded-full p-3">
              <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">Verification Rejected</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Your recruiter account verification was not approved.
          </p>
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-700">Reason for Rejection</h3>
            <p className="mt-1 text-sm text-gray-500">
              We couldn't verify your company information. Please update your profile with accurate company details and resubmit.
            </p>
          </div>
          <div className="mt-6">
            <button 
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              onClick={() => navigate('/recruiter/profile/edit')}
            >
              Update Profile
            </button>
          </div>
          <div className="mt-4">
            <button 
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
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
              className="py-1 px-3 bg-yellow-500 text-white rounded text-xs"
              onClick={() => {
                localStorage.setItem('recruiterVerified', 'pending');
                window.location.reload();
              }}
            >
              Set to Pending
            </button>
            <button 
              className="py-1 px-3 bg-green-500 text-white rounded text-xs"
              onClick={() => {
                localStorage.setItem('recruiterVerified', 'approved');
                window.location.reload();
              }}
            >
              Set to Approved
            </button>
          </div>
        </div>
      </div>
    );
  }

  // For approved status, show the full dashboard
  return <RecruiterDashboard />;
};

export default RecruiterDashboardPage;