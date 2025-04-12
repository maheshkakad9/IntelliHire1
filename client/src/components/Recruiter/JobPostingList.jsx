import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JobPostingList = ({ jobPostings, onAddJobPosting, onUpdateJobPosting, onDeleteJobPosting }) => {
  const [isAddingJob, setIsAddingJob] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);
  const [newJob, setNewJob] = useState({
    title: '',
    location: '',
    description: '',
    skillsRequired: '',
    experienceRequired: '',
    salaryRange: '',
    prioritySkills: '',
    experienceKeywords: '',
    isRemote: false,
    employmentType: 'Full-Time'
  });
  const [recruiterId, setRecruiterId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch recruiter profile when component mounts
  useEffect(() => {
    const fetchRecruiterProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/recruiter/profile`,
          { withCredentials: true }
        );
        console.log(response.data.data);
        setRecruiterId(response.data.data._id);
      } catch (error) {
        console.error('Error fetching recruiter profile:', error);
        if (error.response?.status === 401) {
          navigate('/login?recruiter');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecruiterProfile();
  }, [navigate]);


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewJob({
      ...newJob,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmitNewJob = async (e) => {
    e.preventDefault();
    
    try {
      // Format the job data according to backend requirements
      const formattedJob = {
        title: newJob.title,
        description: newJob.description,
        location: newJob.location,
        skillsRequired: newJob.skillsRequired.split(',').map(skill => skill.trim()).filter(Boolean),
        prioritySkills: newJob.prioritySkills.split(',').map(skill => skill.trim()).filter(Boolean),
        experienceKeywords: newJob.experienceKeywords.split(',').map(kw => kw.trim()).filter(Boolean),
        experienceRequired: parseInt(newJob.experienceRequired) || 0,
        salaryRange: newJob.salaryRange,
        isRemote: newJob.isRemote,
        employmentType: newJob.employmentType,
        recruiterId: recruiterId
      };

      if (editingJobId) {
        // Update existing job
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/job/${editingJobId}`,
          formattedJob,
          { withCredentials: true }
        );
        onUpdateJobPosting(response.data.data);
        setEditingJobId(null);
      } else {
        // Create new job
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/job`,
          formattedJob,
          { withCredentials: true }
        );
        onAddJobPosting(response.data.data);
      }


      setIsAddingJob(false);
      setNewJob({
        title: '',
        location: '',
        description: '',
        skillsRequired: '',
        experienceRequired: '',
        salaryRange: '',
        prioritySkills: '',
        experienceKeywords: '',
        isRemote: false,
        employmentType: 'Full-Time'
      });
      
    } catch (error) {
      console.error('Error saving job:', error);
      if (error.response?.status === 401) {
        alert('Session expired - please login again');
        navigate('/login?recruiter');
      } else {
        alert('Error saving job: ' + (error.message || 'Please try again'));
      }
    }
  };

  const handleEditJob = (job) => {
    setEditingJobId(job._id);
    setNewJob({
      title: job.title,
      location: job.location,
      description: job.description,
      skillsRequired: job.skillsRequired.join(', '),
      prioritySkills: job.prioritySkills?.join(', ') || '',
      experienceKeywords: job.experienceKeywords?.join(', ') || '',
      experienceRequired: job.experienceRequired?.toString() || '',
      salaryRange: job.salaryRange || '',
      isRemote: job.isRemote || false,
      employmentType: job.employmentType || 'Full-Time'
    });
    setIsAddingJob(true);
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/job/${jobId}`,
          { withCredentials: true }
        );
        onDeleteJobPosting(jobId);
      } catch (error) {
        console.error('Error deleting job:', error);
        if (error.response?.status === 401) {
          navigate('/login');
        } else {
          alert('Error deleting job: ' + (error.message || 'Please try again'));
        }
      }
    }
  };

  return (
    <div>
      {/* Add New Job Button */}
      {!isAddingJob && (
        <div className="mb-5">
          <button
            onClick={() => setIsAddingJob(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Post New Job
          </button>
        </div>
      )}

      {/* New Job Form */}
      {isAddingJob && (
        <div className="bg-white shadow rounded-lg mb-5">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {editingJobId ? 'Edit Job Posting' : 'Create New Job Posting'}
            </h3>
            <form onSubmit={handleSubmitNewJob} className="mt-5">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title*</label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      required
                      value={newJob.title}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="location"
                      id="location"
                      value={newJob.location}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700">Employment Type</label>
                  <div className="mt-1">
                    <select
                      id="employmentType"
                      name="employmentType"
                      value={newJob.employmentType}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="experienceRequired" className="block text-sm font-medium text-gray-700">Experience Required (years)</label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="experienceRequired"
                      id="experienceRequired"
                      min="0"
                      value={newJob.experienceRequired}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="salaryRange" className="block text-sm font-medium text-gray-700">Salary Range</label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="salaryRange"
                      id="salaryRange"
                      placeholder="e.g., ₹10-15 LPA"
                      value={newJob.salaryRange}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="skillsRequired" className="block text-sm font-medium text-gray-700">Skills Required (comma separated)</label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="skillsRequired"
                      id="skillsRequired"
                      placeholder="e.g., React, JavaScript, Node.js"
                      value={newJob.skillsRequired}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="prioritySkills" className="block text-sm font-medium text-gray-700">Priority Skills (comma separated)</label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="prioritySkills"
                      id="prioritySkills"
                      placeholder="e.g., React, Node.js"
                      value={newJob.prioritySkills}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="experienceKeywords" className="block text-sm font-medium text-gray-700">Experience Keywords (comma separated)</label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="experienceKeywords"
                      id="experienceKeywords"
                      placeholder="e.g., React project, built full stack application"
                      value={newJob.experienceKeywords}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Job Description*</label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      required
                      value={newJob.description}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="isRemote"
                        name="isRemote"
                        type="checkbox"
                        checked={newJob.isRemote}
                        onChange={handleInputChange}
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

              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingJob(false);
                    setEditingJobId(null);
                    setNewJob({
                      title: '',
                      location: '',
                      description: '',
                      skillsRequired: '',
                      experienceRequired: '',
                      salaryRange: '',
                      prioritySkills: '',
                      experienceKeywords: '',
                      isRemote: false,
                      employmentType: 'Full-Time'
                    });
                  }}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {editingJobId ? 'Update Job' : 'Post Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Job Listings */}
      {jobPostings.length === 0 ? (
        <div className="bg-white shadow rounded-lg py-8">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No job postings yet</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new job posting.</p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setIsAddingJob(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create New Job
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {jobPostings.map((job) => (
            <div key={job._id} className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                  <div className="flex-grow">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{job.title}</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      {job.location} {job.isRemote && '• Remote'} • {job.employmentType}
                    </p>
                    {job.salaryRange && (
                      <p className="mt-1 text-sm text-gray-500">{job.salaryRange}</p>
                    )}
                  </div>
                  <div className="mt-4 sm:mt-0 flex items-center">
                    <span className="mr-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {job.applicants?.length || 0} Applicant{job.applicants?.length !== 1 ? 's' : ''}
                    </span>
                    <div className="flex">
                      <button
                        onClick={() => handleEditJob(job)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-700 line-clamp-3">{job.description}</p>
                </div>
                
                {job.skillsRequired && job.skillsRequired.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Skills Required:</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.skillsRequired.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {job.prioritySkills && job.prioritySkills.length > 0 && (
                  <div className="mt-2">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Priority Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.prioritySkills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobPostingList;