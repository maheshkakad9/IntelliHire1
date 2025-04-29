import React, { useState, useEffect } from 'react';
import JobApplicationModal from './JobApplicationModal';
import { useGetAllJobsQuery, 
         useSearchJobsQuery,
         useGetJobByIdQuery 
} from '../../../store/api/jobsApi'; 

const Jobs = ({ user, onUpdateAppliedJobs }) => {
  const [activeTab, setActiveTab] = useState('recommended');
  const [filters, setFilters] = useState({ title: '', location: '', experience: '' });
  const [searchParams, setSearchParams] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: allJobsData, isLoading:isAllJobsLoading } = useGetAllJobsQuery();
  console.log("All Jobs Data",allJobsData);
  const { data: searchedJobs, isLoading: isSearching } = useSearchJobsQuery(searchParams, {
    skip: !searchParams,
  });

  const { data: jobDetail, isLoading: isJobLoading } = useGetJobByIdQuery(selectedJobId, {
    skip: !selectedJobId,
  });

  console.log("jobDetails",jobDetail);
  const searchJobs = () => {
    const { title, location, experience } = filters;
    const params = {
      ...(title && { title }),
      ...(location && { location }),
      ...(experience && { experience }), // optional: support comma-separated string
    };
    setSearchParams(params);
  }; 

  const jobs = searchParams ? searchedJobs || [] : allJobsData?.data || [];
  const loading = searchParams ? isSearching : isAllJobsLoading;

  const handleApplyForJob = async (job, resumeUrl) => {
    if (user.appliedJobs.some(j => j.id === job._id)) {
      alert("You've already applied to this job");
      return;
    }

      const updatedAppliedJobs = [...user.appliedJobs, {
        id: jobDetail.data._id,
        title: jobDetail.data.title,
        company: jobDetail.data.recruiterId.companyName,
        logo: jobDetail.data.logo,
        appliedDate: new Date().toISOString(),
        status: 'Applied',
        resumeUrl
      }];

      onUpdateAppliedJobs(updatedAppliedJobs);
      alert('Application submitted successfully!');
      setIsModalOpen(false);
      setSelectedJobId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleJobSelect = (jobId) => {
    setSelectedJobId(jobId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJobId(null);
  };


  return (
    <> 
      {/* Search bar */}
      <div className="bg-white shadow rounded-lg mb-5">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <label htmlFor="job-search" className="sr-only">Search for jobs</label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="search"
                  name="title"
                  id="job-search"
                  value={filters.title}
                  onChange={handleInputChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search for jobs, skills, companies"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                name="location"
                value={filters.location}
                onChange={handleInputChange}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">Location</option>
                <option>Mumbai</option>
                <option>Bangalore</option>
                <option>Delhi</option>
                <option>Hyderabad</option>
                <option>Chennai</option>
                <option>Remote</option>
              </select>

              <select
                name="experience"
                value={filters.experience}
                onChange={handleInputChange}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">Experience</option>
                <option value="0">0 years</option>
                <option value="1">1 years</option>
                <option value="3">3 years</option>
                <option value="5">5 years</option>
              </select>

              <button
                onClick={searchJobs}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* Tabs */}
      <div className="bg-white shadow rounded-lg mb-5">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('recommended')}
              className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                activeTab === 'recommended'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Recommended
            </button>
            <button
              onClick={() => setActiveTab('recent')}
              className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                activeTab === 'recent'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Recent Jobs
            </button>
            <button
              onClick={() => setActiveTab('nearby')}
              className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                activeTab === 'nearby'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Nearby
            </button>
          </nav>
        </div>
      </div>

      {/* Job listings */}
      <div className="space-y-5">
        {loading ? (
          <div className="flex justify-center py-10">
            <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No jobs found matching your criteria.</p>
          </div>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12">
                    <img className="h-12 w-12 rounded-md" src={job.recruiterId.profilePicUrl} alt={job.company} />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-500">
                          {job.company} · {job.location}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-500 mr-2">Match</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          job.matchScore > 90 ? 'bg-green-100 text-green-800' :
                          job.matchScore > 75 ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {job.matchScore}%
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <p className="line-clamp-2">{job.description}</p>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {job.skillsRequired.map((skill, index) => (
                        <span
                          key={index}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.skills.some(s => s.toLowerCase() === skill.toLowerCase())
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {skill}
                          {user.skills.some(s => s.toLowerCase() === skill.toLowerCase()) && (
                            <svg className="ml-1 h-3 w-3 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Posted {job.postedAt}</span>
                        <span className="mx-2">•</span>
                        <span>{job.salaryRange}</span>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          type="button"
                          onClick={() => handleJobSelect(job._id)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          disabled={user.appliedJobs.some(j => j.id === job._id)}
                        >
                          {user.appliedJobs.some(j => j.id === job._id) ? 'Applied' : 'Apply Now'}
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        <div className="mt-6 text-center">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Load More Jobs
          </button>
        </div>

        {/* Job Application Modal */}
        {isModalOpen && jobDetail && (
          <JobApplicationModal 
            job={jobDetail.data}
            user={user}
            onClose={handleCloseModal}
            onApply={handleApplyForJob}
          />
        )}
      </div>
    </>
  );
};

export default Jobs;