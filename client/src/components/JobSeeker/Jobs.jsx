import React, { useState, useEffect } from 'react';
import JobApplicationModal from './JobApplicationModal';

const Jobs = ({ user, onUpdateAppliedJobs }) => {
  const [activeTab, setActiveTab] = useState('recommended');
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for jobs - replace with API call
  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setJobs([
        {
          id: '1',
          title: 'Frontend Developer',
          company: 'TechSolutions Inc',
          logo: 'https://via.placeholder.com/50',
          location: 'Mumbai',
          description: 'We are looking for a skilled frontend developer with expertise in React, Redux, and modern JavaScript. The ideal candidate will have experience building responsive web applications and working in an agile team environment.',
          skillsRequired: ['React', 'JavaScript', 'HTML', 'CSS', 'Redux'],
          experienceRequired: 2,
          salaryRange: '₹10-15 LPA',
          postedAt: '3 days ago',
          matchScore: user.skills.some(skill => skill === 'React') ? 95 : 75,
        },
        {
          id: '2',
          title: 'Full Stack Developer',
          company: 'InnovateTech',
          logo: 'https://via.placeholder.com/50',
          location: 'Bangalore',
          description: 'Join our team to develop scalable web applications using Node.js and React. You will be responsible for both frontend and backend development, working closely with product managers and designers.',
          skillsRequired: ['Node.js', 'React', 'MongoDB', 'Express'],
          experienceRequired: 3,
          salaryRange: '₹12-18 LPA',
          postedAt: '1 day ago',
          matchScore: user.skills.some(skill => skill === 'Node.js') ? 88 : 65,
        },
        {
          id: '3',
          title: 'UI/UX Designer',
          company: 'Creative Designs',
          logo: 'https://via.placeholder.com/50',
          location: 'Remote',
          description: 'We are seeking a UI/UX designer to create amazing user experiences. The ideal candidate should have a strong portfolio demonstrating expertise in creating user-centered designs.',
          skillsRequired: ['Figma', 'User Research', 'Prototyping', 'UI Design'],
          experienceRequired: 1,
          salaryRange: '₹8-12 LPA',
          postedAt: '5 days ago',
          matchScore: user.skills.some(skill => skill === 'Figma') ? 90 : 60,
        }
      ]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [user.skills]);

  const handleApplyForJob = (jobId, resumeUrl) => {
    // Check if user has already applied
    if (user.appliedJobs.some(j => j.id === jobId)) {
      alert("You've already applied to this job");
      return;
    }
    
    // In a real application, this would call an API
    // For now, just add to the user's applied jobs
    const appliedJob = jobs.find(job => job.id === jobId);
    if (appliedJob) {
      const updatedAppliedJobs = [...user.appliedJobs, {
        id: jobId,
        title: appliedJob.title,
        company: appliedJob.company,
        logo: appliedJob.logo,
        appliedDate: new Date().toISOString(),
        status: 'Applied',
        resumeUrl
      }];
      
      onUpdateAppliedJobs(updatedAppliedJobs);
      alert('Application submitted successfully!');
    }
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
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="search"
                  name="job-search"
                  id="job-search"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search for jobs, skills, companies"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div>
                <label htmlFor="location" className="sr-only">Location</label>
                <select
                  id="location"
                  name="location"
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
              </div>
              <div>
                <label htmlFor="experience" className="sr-only">Experience</label>
                <select
                  id="filter-experience"
                  name="experience"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">Experience</option>
                  <option>0-1 years</option>
                  <option>1-3 years</option>
                  <option>3-5 years</option>
                  <option>5+ years</option>
                </select>
              </div>
              <button
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
            <div key={job.id} className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12">
                    <img className="h-12 w-12 rounded-md" src={job.logo} alt={job.company} />
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
                          onClick={() => setSelectedJob(job)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          disabled={user.appliedJobs.some(j => j.id === job.id)}
                        >
                          {user.appliedJobs.some(j => j.id === job.id) ? 'Applied' : 'Apply Now'}
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
        {selectedJob && (
          <JobApplicationModal 
            job={selectedJob}
            user={user}
            onClose={() => setSelectedJob(null)}
            onApply={handleApplyForJob}
          />
        )}
      </div>
    </>
  );
};

export default Jobs;