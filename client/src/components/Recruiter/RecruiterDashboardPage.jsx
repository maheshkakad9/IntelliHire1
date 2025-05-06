import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const RecruiterDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'jobs'
  const [recruiterData, setRecruiterData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAddingJob, setIsAddingJob] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    location: '',
    description: '',
    skillsRequired: '',
    experienceRequired: '',
    salaryRange: '',
    isRemote: false,
    employmentType: 'Full-Time'
  });
  const navigate = useNavigate();

  // Add logout function
  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/recruiter/logout`,
        {},
        { withCredentials: true }
      );
      navigate('/');
      toast("Recruiter logout successfully!");
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if API call fails, redirect to login
      navigate('/');
    }
  };

  // Fetch recruiter profile and jobs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 1. Fetch recruiter profile
        const profileResponse = await axios.get(
          `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/recruiter/profile`,
          { withCredentials: true }
        );
        setRecruiterData(profileResponse.data.data);
        
        // 2. Fetch recruiter's jobs
        const jobsResponse = await axios.get(
          `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/job/recruiter/${profileResponse.data.data._id}`,
          { withCredentials: true }
        );
        setJobs(jobsResponse.data.data);
        
        if (jobsResponse.data.data.length > 0) {
          setSelectedJobId(jobsResponse.data.data[0]._id);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response?.status === 401) {
          navigate('/login?recruiter');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Handle job posting form submission
  const handleSubmitJob = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/job`,
        {
          ...newJob,
          skillsRequired: newJob.skillsRequired.split(',').map(skill => skill.trim()),
          recruiterId: recruiterData._id
        },
        { withCredentials: true }
      );
      
      setJobs([...jobs, response.data.data]);
      setIsAddingJob(false);
      setNewJob({
        title: '',
        location: '',
        description: '',
        skillsRequired: '',
        experienceRequired: '',
        salaryRange: '',
        isRemote: false,
        employmentType: 'Full-Time'
      });
    } catch (error) {
      console.error('Error posting job:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="px-6 py-4 flex items-center space-x-4">
          <div className="flex items-center space-x-4">
          <img 
            src={recruiterData.profilePicUrl} 
            alt="Profile" 
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{recruiterData.name}</h1>
            <p className="text-gray-600">{recruiterData.companyName}</p>
            <p className="text-sm text-gray-500">{recruiterData.email} • {recruiterData.phone}</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="border-t border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'profile' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              My Profile
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'jobs' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              My Job Postings
            </button>
          </nav>
        </div>
      </div>

      {/* Profile Tab Content */}
      {activeTab === 'profile' && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Personal Details</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {recruiterData.name}</p>
                <p><span className="font-medium">Email:</span> {recruiterData.email}</p>
                <p><span className="font-medium">Phone:</span> {recruiterData.phone}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Company Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Company Name:</span> {recruiterData.companyName}</p>
                <p><span className="font-medium">Website:</span> 
                  <a href={recruiterData.companyWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                    {recruiterData.companyWebsite}
                  </a>
                </p>
                <p><span className="font-medium">Verification Status:</span> 
                  <span className={`ml-1 capitalize ${recruiterData.verificationStatus === 'approved' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {recruiterData.verificationStatus}
                  </span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-sm text-blue-700">Total Jobs Posted</p>
                <p className="text-2xl font-bold text-blue-700">{jobs.length}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-sm text-green-700">Active Jobs</p>
                <p className="text-2xl font-bold text-green-700">
                  {jobs.filter(job => new Date(job.createdAt) > new Date(Date.now() - 30*24*60*60*1000)).length}
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <p className="text-sm text-purple-700">Total Applicants</p>
                <p className="text-2xl font-bold text-purple-700">
                  {jobs.reduce((total, job) => total + (job.applicants?.length || 0), 0)}
                </p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <p className="text-sm text-yellow-700">Hired Candidates</p>
                <p className="text-2xl font-bold text-yellow-700">
                  {jobs.reduce((total, job) => total + (job.applicants?.filter(a => a.status === 'Hired').length || 0), 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Jobs Tab Content */}
      {activeTab === 'jobs' && (
        <div className="space-y-6">
          {/* Add New Job Button */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">My Job Postings</h2>
            <button
              onClick={() => setIsAddingJob(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Post New Job
            </button>
          </div>

          {/* New Job Form */}
          {isAddingJob && (
            <div className="bg-white shadow rounded-lg mb-6">
              <div className="px-6 py-5">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Job Posting</h3>
                <form onSubmit={handleSubmitJob} className="space-y-4">
                  <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title*</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        value={newJob.title}
                        onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={newJob.location}
                        onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700">Employment Type</label>
                      <select
                        id="employmentType"
                        name="employmentType"
                        value={newJob.employmentType}
                        onChange={(e) => setNewJob({...newJob, employmentType: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="experienceRequired" className="block text-sm font-medium text-gray-700">Experience (years)</label>
                      <input
                        type="number"
                        id="experienceRequired"
                        name="experienceRequired"
                        min="0"
                        value={newJob.experienceRequired}
                        onChange={(e) => setNewJob({...newJob, experienceRequired: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="salaryRange" className="block text-sm font-medium text-gray-700">Salary Range</label>
                      <input
                        type="text"
                        id="salaryRange"
                        name="salaryRange"
                        placeholder="e.g., $50,000 - $70,000"
                        value={newJob.salaryRange}
                        onChange={(e) => setNewJob({...newJob, salaryRange: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="skillsRequired" className="block text-sm font-medium text-gray-700">Skills Required (comma separated)</label>
                      <input
                        type="text"
                        id="skillsRequired"
                        name="skillsRequired"
                        placeholder="e.g., JavaScript, React, Node.js"
                        value={newJob.skillsRequired}
                        onChange={(e) => setNewJob({...newJob, skillsRequired: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">Job Description*</label>
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        required
                        value={newJob.description}
                        onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="isRemote"
                            name="isRemote"
                            type="checkbox"
                            checked={newJob.isRemote}
                            onChange={(e) => setNewJob({...newJob, isRemote: e.target.checked})}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="isRemote" className="font-medium text-gray-700">Remote Opportunity</label>
                          <p className="text-gray-500">Check if this position can be done remotely.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsAddingJob(false)}
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Post Job
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Job Listings */}
          {jobs.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No job postings yet</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new job posting.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job._id} className="bg-white shadow overflow-hidden rounded-lg">
                  <div className="px-6 py-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                      <div className="flex-grow">
                        <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {job.location} • {job.employmentType} • {new Date(job.createdAt).toLocaleDateString()}
                        </p>
                        <p className="mt-2 text-sm text-gray-700 line-clamp-2">{job.description}</p>
                      </div>
                      <div className="mt-4 sm:mt-0 flex items-center">
                        <span className="mr-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {job.applicants?.length || 0} Applicants
                        </span>
                        <button
                          onClick={() => {
                            setSelectedJobId(job._id);
                            setActiveTab('applications');
                            navigate('/recruiter/dashboard');
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View Applicants
                        </button>
                      </div>
                    </div>
                    
                    {job.skillsRequired?.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Skills Required:</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.skillsRequired.map((skill, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecruiterDashboard;