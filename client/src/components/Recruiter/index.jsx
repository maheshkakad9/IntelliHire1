import React, { useState, useEffect } from 'react';
import Navbar from './Layout/Navbar';
import Profile from './Profile';
import JobPostingList from './JobPostingList';
import JobApplications from './JobApplications';

const RecruiterDashboard = ({ recruiterData }) => {
  // Set initial state with data from registration or defaults
  const [recruiter, setRecruiter] = useState({
    name: recruiterData?.name || "Your Name",
    email: recruiterData?.email || "example@company.com",
    phone: recruiterData?.phone || "",
    companyName: recruiterData?.companyName || "Company Name",
    companyWebsite: recruiterData?.companyWebsite || "",
    profilePicUrl: recruiterData?.profilePicUrl || "https://via.placeholder.com/150",
    verificationStatus: recruiterData?.verificationStatus || "pending", // pending, approved, rejected
    jobPostings: recruiterData?.jobPostings || [],
    subscription: recruiterData?.subscription || "free"
  });

  const [activeTab, setActiveTab] = useState('jobs');
  const [isEditing, setIsEditing] = useState(false);

  // Update recruiter profile
  const handleUpdateProfile = (updatedRecruiterData) => {
    setRecruiter({...recruiter, ...updatedRecruiterData});
    // In a real app, you would also update the backend
  };

  // Add a new job posting
  const handleAddJobPosting = (newJob) => {
    const updatedJobPostings = [...recruiter.jobPostings, {
      ...newJob,
      id: `job-${Date.now()}`, // Generate a temporary ID
      postedAt: new Date().toISOString(),
      applications: []
    }];
    
    setRecruiter({...recruiter, jobPostings: updatedJobPostings});
    // In a real app, you would also update the backend
  };

  // Update existing job posting
  const handleUpdateJobPosting = (updatedJob) => {
    const updatedJobPostings = recruiter.jobPostings.map(job => 
      job.id === updatedJob.id ? updatedJob : job
    );
    
    setRecruiter({...recruiter, jobPostings: updatedJobPostings});
    // In a real app, you would also update the backend
  };

  // Delete job posting
  const handleDeleteJobPosting = (jobId) => {
    const updatedJobPostings = recruiter.jobPostings.filter(job => job.id !== jobId);
    setRecruiter({...recruiter, jobPostings: updatedJobPostings});
    // In a real app, you would also update the backend
  };

  // Handle application status updates
  const handleUpdateApplicationStatus = (jobId, applicationId, newStatus) => {
    const updatedJobPostings = recruiter.jobPostings.map(job => {
      if (job.id === jobId) {
        const updatedApplications = job.applications.map(app => 
          app.id === applicationId ? {...app, status: newStatus} : app
        );
        return {...job, applications: updatedApplications};
      }
      return job;
    });
    
    setRecruiter({...recruiter, jobPostings: updatedJobPostings});
    // In a real app, you would also update the backend
  };

  // Check if recruiter is verified
  const isVerified = recruiter.verificationStatus === 'approved';

  // Render verification pending screen if not verified
  if (recruiter.verificationStatus === 'pending') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar recruiter={recruiter} />
        <main className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-4">
                <svg className="h-8 w-8 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Account Verification Pending</h3>
              <p className="mt-2 max-w-2xl text-sm text-gray-500 mx-auto">
                Your account is currently under review by our admin team. This process typically takes 24-48 hours.
              </p>
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h4 className="text-sm font-medium text-gray-900">While you wait, you can:</h4>
                <ul className="mt-3 text-sm text-gray-500 space-y-2">
                  <li>• Complete your profile information</li>
                  <li>• Explore our resources for recruiters</li>
                  <li>• Prepare job descriptions for posting</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Complete Your Profile
              </button>
            </div>
          </div>
          
          {isEditing && (
            <div className="mt-8">
              <Profile 
                recruiter={recruiter} 
                onUpdateProfile={handleUpdateProfile}
                onFinishEditing={() => setIsEditing(false)}
                isEditing={isEditing}
              />
            </div>
          )}
        </main>
      </div>
    );
  }
  
  // Render rejected verification screen
  if (recruiter.verificationStatus === 'rejected') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar recruiter={recruiter} />
        <main className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <svg className="h-8 w-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Account Verification Rejected</h3>
              <p className="mt-2 max-w-2xl text-sm text-gray-500 mx-auto">
                Unfortunately, your account verification was not approved. This may be due to incomplete information or inability to verify your company details.
              </p>
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h4 className="text-sm font-medium text-gray-900">You can:</h4>
                <ul className="mt-3 text-sm text-gray-500 space-y-2">
                  <li>• Update your company information</li>
                  <li>• Provide additional verification documents</li>
                  <li>• Contact our support team for assistance</li>
                </ul>
              </div>
              <div className="mt-6 flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Update Profile
                </button>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
          
          {isEditing && (
            <div className="mt-8">
              <Profile 
                recruiter={recruiter} 
                onUpdateProfile={handleUpdateProfile}
                onFinishEditing={() => setIsEditing(false)}
                isEditing={isEditing}
              />
            </div>
          )}
        </main>
      </div>
    );
  }

  // Main dashboard for verified recruiters
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar recruiter={recruiter} />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-5 sm:px-0">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left sidebar - Profile */}
            <div className="w-full md:w-1/4">
              <Profile 
                recruiter={recruiter} 
                onUpdateProfile={handleUpdateProfile}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
              
              {/* Subscription Info Card */}
              {!isEditing && (
                <div className="bg-white shadow rounded-lg mt-5">
                  <div className="px-4 py-4 sm:px-6 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900">Subscription</h3>
                  </div>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Current Plan:</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        recruiter.subscription === 'premium' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {recruiter.subscription === 'premium' ? 'Premium' : 'Free'}
                      </span>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        {recruiter.subscription === 'premium' ? 'Manage Subscription' : 'Upgrade Plan'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Right content - Tabs */}
            <div className="w-full md:w-3/4">
              <div className="bg-white shadow rounded-lg mb-5">
                <div className="border-b border-gray-200">
                  <nav className="flex -mb-px" aria-label="Tabs">
                    <button
                      onClick={() => setActiveTab('jobs')}
                      className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                        activeTab === 'jobs'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Job Postings
                    </button>
                    <button
                      onClick={() => setActiveTab('applications')}
                      className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                        activeTab === 'applications'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Applications
                    </button>
                    <button
                      onClick={() => setActiveTab('analytics')}
                      className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                        activeTab === 'analytics'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Analytics
                    </button>
                  </nav>
                </div>
              </div>

              {/* Display the appropriate component based on active tab */}
              {activeTab === 'jobs' && (
                <JobPostingList
                  jobPostings={recruiter.jobPostings}
                  onAddJobPosting={handleAddJobPosting}
                  onUpdateJobPosting={handleUpdateJobPosting}
                  onDeleteJobPosting={handleDeleteJobPosting}
                />
              )}
              
              {activeTab === 'applications' && (
                <JobApplications
                  jobPostings={recruiter.jobPostings}
                  onUpdateApplicationStatus={handleUpdateApplicationStatus}
                />
              )}
              
              {activeTab === 'analytics' && (
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900">Analytics Dashboard</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {recruiter.subscription === 'premium' 
                        ? 'Detailed analytics for your job postings.'
                        : 'Upgrade to Premium to access detailed analytics.'}
                    </p>
                    
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="text-sm text-gray-500 font-medium">Job Views</h4>
                        <p className="text-3xl font-bold">{recruiter.jobPostings.reduce((sum, job) => sum + (job.views || 0), 0)}</p>
                        <p className="text-xs text-green-500 mt-2">↑ 12% from last week</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="text-sm text-gray-500 font-medium">Applications</h4>
                        <p className="text-3xl font-bold">{recruiter.jobPostings.reduce((sum, job) => sum + (job.applications?.length || 0), 0)}</p>
                        <p className="text-xs text-green-500 mt-2">↑ 5% from last week</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="text-sm text-gray-500 font-medium">Applicant Quality</h4>
                        <p className="text-3xl font-bold">78%</p>
                        <p className="text-xs text-green-500 mt-2">↑ 3% from last week</p>
                      </div>
                    </div>
                    
                    {recruiter.subscription !== 'premium' && (
                      <div className="mt-6">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Upgrade to Premium
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecruiterDashboard;
