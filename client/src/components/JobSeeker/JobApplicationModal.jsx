import React, { useState } from 'react';


const JobApplicationModal = ({ job, user, onClose, onApply }) => {
  const [applicationResume, setApplicationResume] = useState(user.resumeUrl);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedResume, setUploadedResume] = useState(null);
  console.log("JOb",job);
  
  // Calculate match score based on user skills matching job requirements
  const getSkillMatchCount = () => {
    if (!user.skills || !job.skillsRequired) return 0;
    return job.skillsRequired.filter(skill => 
      user.skills.some(userSkill => 
        userSkill.toLowerCase() === skill.toLowerCase()
      )
    ).length;
  };

  const skillMatchCount = getSkillMatchCount();
  const totalSkillsRequired = job.skillsRequired ? job.skillsRequired.length : 0;
  const matchPercentage = totalSkillsRequired 
    ? Math.round((skillMatchCount / totalSkillsRequired) * 100) 
    : 0;
  
  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedResume(file);
      setApplicationResume(URL.createObjectURL(file));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      let uploadedUrl = applicationResume;
      let scoreDetails = null;
  
      // If user uploaded a new resume
      if (uploadedResume) {
        const formData = new FormData();
        formData.append('resume', uploadedResume);
        formData.append('jobId', job._id); // 👈 Send jobId with the file
  
        const response = await fetch('http://localhost:8000/api/v1/users/upload-resume', {
          method: 'POST',
          body: formData,
          credentials: 'include', // if you're using cookies with JWT
        });
  
        if (!response.ok) {
          throw new Error('Resume upload failed');
        }
  
        const result = await response.json();
  
        uploadedUrl = result.data.updatedUser.resumeUrl;
        scoreDetails = result.data.scoreDetails;
  
        console.log("Parsed Score Details:", scoreDetails);
      }
  
      // Proceed with your job application logic
      await onApply(job, uploadedUrl);
  
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to apply. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleClose = () => {
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-gray-800">Job Application</h2>
          <button 
            type="button"
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="sr-only">Close</span>
          </button>
        </div>
        
        <div className="px-6 py-4">
          <div className="flex items-start mb-6">
            <div className="flex-shrink-0 h-16 w-16">
              <img className="h-16 w-16 rounded-md" src={job.recruiterId.profilePicUrl} alt={job.company} />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
              <p className="text-gray-500 text-lg">{job.recruiterId.companyName} · {job.location}</p>
              
              <div className="mt-2 flex items-center">
                <span className="text-sm font-medium text-gray-500 mr-2">Match Score:</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  matchPercentage > 90 ? 'bg-green-100 text-green-800' :
                  matchPercentage > 75 ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {matchPercentage}%
                </span>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Job Description</h4>
              <p className="text-gray-600">{job.description}</p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Skills Required</h4>
              <div className="flex flex-wrap gap-2">
                {job.skillsRequired?.map((skill, index) => (
                  <span
                    key={index}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                      user.skills?.some(s => s.toLowerCase() === skill.toLowerCase())
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {skill}
                    {user.skills?.some(s => s.toLowerCase() === skill.toLowerCase()) && (
                      <svg className="ml-1 h-4 w-4 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-8">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">Experience Required</h4>
                <p className="text-gray-600">{job.experienceRequired} years</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">Salary Range</h4>
                <p className="text-gray-600">{job.salaryRange}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">Posted</h4>
                <p className="text-gray-600">{job.updatedAt}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Submit Your Application</h4>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Resume</label>
                  
                  {applicationResume ? (
                    <div className="flex items-center">
                      <div className="bg-gray-50 border border-gray-200 rounded p-3 flex items-center flex-grow">
                        <svg className="h-8 w-8 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Resume</p>
                          <p className="text-xs text-gray-500">
                            {uploadedResume?.name || "Current resume will be used"}
                          </p>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => {
                          setApplicationResume(null);
                          setUploadedResume(null);
                        }}
                        className="ml-2 text-sm text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <input
                        id="resume-upload"
                        name="resume"
                        type="file"
                        className="hidden"
                        onChange={handleResumeChange}
                        accept=".pdf,.doc,.docx"
                      />
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="resume-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                            >
                              <span>Upload a resume</span>
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {!applicationResume && user.resumeUrl && (
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => setApplicationResume(user.resumeUrl)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Use current resume
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!applicationResume || isSubmitting}
                    className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                      !applicationResume || isSubmitting 
                        ? 'bg-blue-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 focus:outline-none'
                    }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationModal;