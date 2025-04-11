import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const defaultAvatar = "https://via.placeholder.com/150";

const Profile = ({ user, isEditing, setIsEditing, onUpdateProfile }) => {
  const [editedUser, setEditedUser] = useState({ ...user });
  const [skillInput, setSkillInput] = useState('');
  
  // Calculate profile completeness
  const calculateProfileCompleteness = () => {
    const fields = [
      !!user.name, 
      !!user.email, 
      !!user.phone, 
      !!user.location, 
      user.skills && user.skills.length > 0, 
      !!user.experience, 
      !!user.education, 
      !!user.resumeUrl
    ];
    
    const filledFields = fields.filter(Boolean).length;
    return Math.round((filledFields / fields.length) * 100);
  };
  
  const profileCompleteness = calculateProfileCompleteness();
  
  const handleAddSkill = () => {
    if (skillInput.trim() && !editedUser.skills.includes(skillInput.trim())) {
      setEditedUser({
        ...editedUser,
        skills: [...editedUser.skills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };
  
  const handleRemoveSkill = (skillToRemove) => {
    setEditedUser({
      ...editedUser,
      skills: editedUser.skills.filter(skill => skill !== skillToRemove)
    });
  };
  
  const handleSaveProfile = () => {
    onUpdateProfile(editedUser);
    setIsEditing(false);
  };
  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Create a local URL for preview
    const objectUrl = URL.createObjectURL(file);
    
    if (e.target.name === 'profilePic') {
      setEditedUser({ ...editedUser, profilePicUrl: objectUrl });
    } else if (e.target.name === 'resume') {
      setEditedUser({ ...editedUser, resumeUrl: objectUrl });
    }
  };
  
  return (
    <>
      {isEditing ? (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Complete Your Profile</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Fill out your profile details to get personalized job recommendations.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <form>
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="relative">
                    <img 
                      src={editedUser.profilePicUrl || defaultAvatar} 
                      alt={editedUser.name} 
                      className="h-24 w-24 rounded-full object-cover border-2 border-gray-200"
                    />
                    <label 
                      htmlFor="profile-photo" 
                      className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1 cursor-pointer"
                    >
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <input 
                        id="profile-photo" 
                        name="profilePic"
                        type="file" 
                        className="hidden"
                        onChange={handleFileUpload}
                        accept="image/*"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={editedUser.name}
                    onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={editedUser.email}
                    disabled
                    className="mt-1 block w-full border border-gray-300 bg-gray-50 rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm"
                  />
                  <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={editedUser.phone}
                    onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={editedUser.location}
                    onChange={(e) => setEditedUser({...editedUser, location: e.target.value})}
                    placeholder="e.g. Mumbai, Maharashtra"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills</label>
                  <div className="mt-1 flex flex-wrap gap-1 mb-2">
                    {editedUser.skills?.map((skill, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none"
                        >
                          <span className="sr-only">Remove {skill}</span>
                          <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                            <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="skillInput"
                      id="skillInput"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      placeholder="e.g. JavaScript"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkill();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 sm:text-sm"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience</label>
                  <select
                    id="experience"
                    name="experience"
                    value={editedUser.experience}
                    onChange={(e) => setEditedUser({...editedUser, experience: e.target.value})}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="">Select experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="1-2 years">1-2 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5-8 years">5-8 years</option>
                    <option value="8+ years">8+ years</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="education" className="block text-sm font-medium text-gray-700">Education</label>
                  <select
                    id="education"
                    name="education"
                    value={editedUser.education}
                    onChange={(e) => setEditedUser({...editedUser, education: e.target.value})}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="">Select education level</option>
                    <option value="High School">High School</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="Ph.D">Ph.D</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Resume</label>
                  <div className="mt-1 flex items-center">
                    <input
                      id="resume-upload"
                      name="resume"
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    >
                      {editedUser.resumeUrl ? 'Change Resume' : 'Upload Resume'}
                    </label>
                    {editedUser.resumeUrl && (
                      <span className="ml-3 text-sm text-green-600">
                        Resume uploaded successfully
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-gray-500">PDF, DOC, or DOCX up to 5MB</p>
                </div>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
              <div className="absolute bottom-0 transform translate-y-1/2 left-6">
                <img
                  src={user.profilePicUrl || defaultAvatar}
                  alt={user.name}
                  className="h-24 w-24 rounded-full border-4 border-white object-cover"
                />
              </div>
            </div>
            <div className="px-6 pt-16 pb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                  <svg className="-ml-0.5 mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-500">{user.experience || "Add your experience"}</p>
              <p className="text-sm text-gray-500">{user.location || "Add your location"}</p>

              <div className="mt-6">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-gray-500">Profile Completeness</span>
                  <span className="text-xs font-medium text-gray-700">{profileCompleteness}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      profileCompleteness < 50 ? 'bg-red-500' : 
                      profileCompleteness < 80 ? 'bg-yellow-500' : 
                      'bg-green-500'
                    }`} 
                    style={{ width: `${profileCompleteness}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="ml-2 text-sm text-gray-500">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="ml-2 text-sm text-gray-500">{user.phone}</span>
                  </div>
                )}
                {user.education && (
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                    <span className="ml-2 text-sm text-gray-500">{user.education}</span>
                  </div>
                )}
              </div>

              {user.skills && user.skills.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700">Skills</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
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

              {user.resumeUrl ? (
                <div className="mt-6 flex">
                  <a
                    href={user.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                  >
                    <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
                    </svg>
                    Download Resume
                  </a>
                </div>
              ) : (
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                  >
                    <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Resume
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-4 sm:px-6 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-900">Quick Actions</h3>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <nav className="space-y-1" aria-label="Sidebar">
                <Link
                  to="/jobs/saved"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900"
                >
                  <svg className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span className="truncate">Saved Jobs</span>
                </Link>

                <Link
                  to="/jobs/applied"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900"
                >
                  <svg className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  <span className="truncate">Applied Jobs</span>
                  {user.appliedJobs?.length > 0 && (
                    <span className="inline-flex items-center justify-center ml-auto w-5 h-5 text-xs font-medium text-white bg-blue-500 rounded-full">
                      {user.appliedJobs.length}
                    </span>
                  )}
                </Link>

                <Link
                  to="/profile/view"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900"
                >
                  <svg className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span className="truncate">Profile Views</span>
                </Link>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;