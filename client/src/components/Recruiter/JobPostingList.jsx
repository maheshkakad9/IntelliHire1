import React, { useState } from 'react';

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
    isRemote: false,
    employmentType: 'Full-Time'
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewJob({
      ...newJob,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmitNewJob = (e) => {
    e.preventDefault();
    
    // Format skills as array
    const formattedJob = {
      ...newJob,
      skillsRequired: newJob.skillsRequired.split(',').map(skill => skill.trim()).filter(Boolean)
    };
    
    if (editingJobId) {
      onUpdateJobPosting({ ...formattedJob, id: editingJobId });
      setEditingJobId(null);
    } else {
      onAddJobPosting(formattedJob);
    }
    
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
  };

  const handleEditJob = (job) => {
    setEditingJobId(job.id);
    setNewJob({
      ...job,
      skillsRequired: job.skillsRequired.join(', ')
    });
    setIsAddingJob(true);
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      onDeleteJobPosting(jobId);
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
            <div key={job.id} className="bg-white shadow overflow-hidden rounded-lg">
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
                      {job.applications?.length || 0} Applicant{job.applications?.length !== 1 ? 's' : ''}
                    </span>
                    <div className="flex">
                      <button
                        onClick={() => handleEditJob(job)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job.id)}
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
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.skillsRequired.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Posted {new Date(job.postedAt).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>{job.views || 0} views</span>
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