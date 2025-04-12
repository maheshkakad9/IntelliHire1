import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JobApplications = () => {
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [isViewingResume, setIsViewingResume] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [recruiterId, setRecruiterId] = useState(null);
  const navigate = useNavigate();

  // Fetch recruiter profile to get recruiterId
  useEffect(() => {
    const fetchRecruiterProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/recruiter/profile`,
          { withCredentials: true }
        );
        setRecruiterId(response.data.data._id);
      } catch (error) {
        console.error('Error fetching recruiter profile:', error);
        if (error.response?.status === 401) {
          navigate('/login?recruiter');
        }
      }
    };

    fetchRecruiterProfile();
  }, [navigate]);

  // Fetch recruiter's jobs when recruiterId is available
  useEffect(() => {
    const fetchRecruiterJobs = async () => {
      if (!recruiterId) return;
      
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/job/recruiter/${recruiterId}`,
          { withCredentials: true }
        );
        
        const jobsWithApplicants = response.data.data || [];
        setJobs(jobsWithApplicants);
        
        // Set default selected job if there are jobs
        if (jobsWithApplicants.length > 0 && !selectedJobId) {
          setSelectedJobId(jobsWithApplicants[0]._id);
        }
      } catch (error) {
        console.error('Error fetching recruiter jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecruiterJobs();
  }, [recruiterId, selectedJobId]);

  // Find currently selected job
  const selectedJob = selectedJobId ? 
    jobs.find(job => job._id === selectedJobId) || {} : 
    {};
    
  // Get applications from the selected job
  const applications = selectedJob.applicants?.map(app => ({
    id: app._id,
    candidateName: app.userId?.name || 'Candidate',
    candidateEmail: app.userId?.email || 'No email provided',
    matchScore: app.score || 0,
    status: app.status || 'Applied',
    appliedDate: app.createdAt || selectedJob.createdAt,
    resumeUrl: app.userId?.resumeUrl || null,
    profilePicUrl: app.userId?.profilePicUrl || null,
    skills: app.userId?.skills || [],
    experience: app.userId?.experience || '',
    breakdown: app.breakdown || {}
  })) || [];

  // Filter applications
  const filteredApplications = applications.filter(app => {
    const matchesSearch = !searchTerm || 
      app.candidateName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.candidateEmail?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Sort applications
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.appliedDate) - new Date(a.appliedDate);
    } else if (sortOrder === 'oldest') {
      return new Date(a.appliedDate) - new Date(b.appliedDate);
    } else if (sortOrder === 'matchScore') {
      return b.matchScore - a.matchScore;
    }
    return 0;
  });

  // Handle status change
  const handleStatusChange = async (applicationId, newStatus) => {
    if (!selectedJobId) return;
    
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/job/${selectedJobId}/application/${applicationId}/status`, 
        { status: newStatus },
        { withCredentials: true }
      );
      
      // Update local state
      setJobs(prevJobs => prevJobs.map(job => {
        if (job._id === selectedJobId) {
          const updatedApplicants = job.applicants.map(app => 
            app._id === applicationId ? {...app, status: newStatus} : app
          );
          return {...job, applicants: updatedApplicants};
        }
        return job;
      }));
      
      if (selectedApplication?.id === applicationId) {
        setSelectedApplication({...selectedApplication, status: newStatus});
      }
    } catch (error) {
      console.error('Error updating application status:', error);
      alert('Failed to update status. Please try again.');
    }
  };

  const viewResume = (application) => {
    setSelectedApplication(application);
    setIsViewingResume(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied': return 'bg-blue-100 text-blue-800';
      case 'Screening': return 'bg-yellow-100 text-yellow-800';
      case 'Interview': return 'bg-purple-100 text-purple-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Hired': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Calculate application statistics
  const totalApplications = applications.length;
  const newApplications = applications.filter(app => app.status === 'Applied').length;
  const applicationStats = {
    screening: applications.filter(app => app.status === 'Screening').length,
    interview: applications.filter(app => app.status === 'Interview').length,
    hired: applications.filter(app => app.status === 'Hired').length,
    rejected: applications.filter(app => app.status === 'Rejected').length
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Resume Viewer Modal */}
      {isViewingResume && selectedApplication && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{selectedApplication.candidateName}'s Application</h3>
                <p className="text-sm text-gray-500">Applied on {formatDate(selectedApplication.appliedDate)}</p>
              </div>
              <button 
                onClick={() => setIsViewingResume(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Candidate Info */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    {selectedApplication.profilePicUrl ? (
                      <img 
                        src={selectedApplication.profilePicUrl} 
                        alt="Profile" 
                        className="h-16 w-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-2xl font-bold">
                        {selectedApplication.candidateName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-medium">{selectedApplication.candidateName}</h3>
                      <p className="text-sm text-gray-500">{selectedApplication.candidateEmail}</p>
                      <p className="text-sm">{selectedApplication.experience}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Match Score</h4>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-green-600 h-2.5 rounded-full" 
                          style={{width: `${selectedApplication.matchScore}%`}}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm font-medium">{selectedApplication.matchScore}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Status</h4>
                    <select 
                      className={`w-full ${getStatusColor(selectedApplication.status)} rounded-md p-2`}
                      value={selectedApplication.status}
                      onChange={(e) => handleStatusChange(selectedApplication.id, e.target.value)}
                    >
                      <option value="Applied">Applied</option>
                      <option value="Screening">Screening</option>
                      <option value="Interview">Interview</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Hired">Hired</option>
                    </select>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Score Breakdown</h4>
                    <div className="space-y-2">
                      {Object.entries(selectedApplication.breakdown).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="capitalize text-sm">
                            {key.replace('_score', '').replace('_', ' ')}
                          </span>
                          <div className="w-24 bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full" 
                              style={{width: `${value}%`}}
                            ></div>
                          </div>
                          <span className="text-sm font-medium w-10 text-right">
                            {Math.round(value)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 space-y-2">
                    <a
                      href={selectedApplication.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Download Resume
                    </a>
                  </div>
                </div>
                
                {/* Resume Preview */}
                <div className="md:col-span-2 bg-gray-50 rounded-lg p-4 h-full">
                  <h4 className="font-medium mb-4">Resume Preview</h4>
                  {selectedApplication.resumeUrl ? (
                    <iframe 
                      src={`${selectedApplication.resumeUrl}#view=fitH`}
                      className="w-full h-full min-h-[60vh] border rounded"
                      title="Resume Preview"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      No resume available
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="space-y-6">
        {/* Job selection dropdown */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <label htmlFor="job-select" className="block text-sm font-medium text-gray-700 mb-1">Select Job</label>
              <select
                id="job-select"
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={selectedJobId || ''}
                onChange={(e) => setSelectedJobId(e.target.value)}
              >
                <option value="">Select a job</option>
                {jobs.map(job => (
                  <option key={job._id} value={job._id}>
                    {job.title} ({job.applicants?.length || 0} applications)
                  </option>
                ))}
              </select>
            </div>

            {selectedJobId && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="bg-blue-50 rounded-lg p-2 text-center">
                  <p className="text-xs text-blue-700">Total</p>
                  <p className="text-lg font-bold text-blue-700">{totalApplications}</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-2 text-center">
                  <p className="text-xs text-yellow-700">New</p>
                  <p className="text-lg font-bold text-yellow-700">{newApplications}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-2 text-center">
                  <p className="text-xs text-green-700">Hired</p>
                  <p className="text-lg font-bold text-green-700">{applicationStats.hired}</p>
                </div>
                <div className="bg-red-50 rounded-lg p-2 text-center">
                  <p className="text-xs text-red-700">Rejected</p>
                  <p className="text-lg font-bold text-red-700">{applicationStats.rejected}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {selectedJobId && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {applications.length === 0 ? (
              <div className="p-6 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No applications yet</h3>
                <p className="mt-1 text-sm text-gray-500">No one has applied to this job yet.</p>
              </div>
            ) : (
              <>
                <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-200">
                  <div className="col-span-1 md:col-span-2">
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search Candidates</label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input
                        type="search"
                        name="search"
                        id="search"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Search by name or email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        id="status-filter"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="all">All Statuses</option>
                        <option value="Applied">Applied</option>
                        <option value="Screening">Screening</option>
                        <option value="Interview">Interview</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Hired">Hired</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="sort-order" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                      <select
                        id="sort-order"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                      >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="matchScore">Best Match</option>
                      </select>
                    </div>
                  </div>
                </div>
            
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match Score</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sortedApplications.map((application) => (
                        <tr key={application.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {application.profilePicUrl ? (
                                <img 
                                  src={application.profilePicUrl} 
                                  alt="Profile" 
                                  className="h-10 w-10 rounded-full object-cover"
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                                  {application.candidateName.charAt(0).toUpperCase()}
                                </div>
                              )}
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{application.candidateName}</div>
                                <div className="text-sm text-gray-500">{application.candidateEmail}</div>
                                {application.skills.length > 0 && (
                                  <div className="mt-1 flex flex-wrap gap-1">
                                    {application.skills.map((skill, i) => (
                                      <span key={i} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-600 h-2 rounded-full" 
                                  style={{width: `${application.matchScore}%`}}
                                ></div>
                              </div>
                              <span className="ml-2 text-sm font-medium">{application.matchScore}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select 
                              className={`text-xs font-medium rounded-full py-1 px-3 ${getStatusColor(application.status)} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                              value={application.status}
                              onChange={(e) => handleStatusChange(application.id, e.target.value)}
                            >
                              <option value="Applied">Applied</option>
                              <option value="Screening">Screening</option>
                              <option value="Interview">Interview</option>
                              <option value="Rejected">Rejected</option>
                              <option value="Hired">Hired</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(application.appliedDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button 
                              onClick={() => viewResume(application)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplications;