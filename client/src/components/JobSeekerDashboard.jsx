import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Choose one of these options for defaultAvatar:
// Option 1: Use an online placeholder (recommended if you don't have the image asset)
const defaultAvatar = "https://via.placeholder.com/150"; 

// Option 2: Import from assets (uncomment this and remove Option 1 if you have the image)
// import defaultAvatar from '../assets/default-avatar.png';

const JobSeekerDashboard = ({ userData }) => {
  // If userData is passed through props, use that, otherwise use default values
  const [user, setUser] = useState({
    name: userData?.name || "Your Name",
    email: userData?.email || "example@email.com",
    phone: userData?.phone || "",
    location: userData?.location || "",
    skills: userData?.skills || [],
    experience: userData?.experience || "",
    education: userData?.education || "",
    profilePicUrl: userData?.profilePicUrl || defaultAvatar,
    resumeUrl: userData?.resumeUrl || null,
    appliedJobs: userData?.appliedJobs || []
  });

  // Rest of your component code remains the same...

  // State for profile editing
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedUser, setEditedUser] = useState({...user});
  
  // State for skill input
  const [skillInput, setSkillInput] = useState('');
  
  // Tabs for job types
  const [activeTab, setActiveTab] = useState('recommended');

  // Mock jobs data - would be replaced with API calls
  const [jobs, setJobs] = useState([
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'Tech Solutions Inc.',
      logo: 'https://via.placeholder.com/50',
      location: 'Mumbai',
      salary: '₹15-22 LPA',
      description: 'We are looking for a skilled frontend developer with expertise in React, Redux, and modern JavaScript. The ideal candidate will have experience building responsive web applications.',
      skills: ['React', 'JavaScript', 'Redux', 'HTML', 'CSS'],
      postedAt: '3 days ago',
      matchScore: 95
    },
    {
      id: '2',
      title: 'Backend Developer',
      company: 'CloudSys Technologies',
      logo: 'https://via.placeholder.com/50',
      location: 'Bangalore',
      salary: '₹12-18 LPA',
      description: 'Join our backend team to develop robust APIs and microservices using Node.js and Express. Knowledge of MongoDB and PostgreSQL required.',
      skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
      postedAt: '1 week ago',
      matchScore: 78
    },
    {
      id: '3',
      title: 'Full Stack Engineer',
      company: 'Digital Innovators',
      logo: 'https://via.placeholder.com/50',
      location: 'Remote',
      salary: '₹18-25 LPA',
      description: 'Looking for a versatile full stack developer comfortable with both frontend and backend technologies to help build our next-generation platform.',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'JavaScript'],
      postedAt: '2 days ago',
      matchScore: 88
    }
  ]);

  // Effect to check profile completeness and suggest completing it
  useEffect(() => {
    const isProfileIncomplete = !user.location || !user.experience || !user.skills.length || !user.resumeUrl;
    if (isProfileIncomplete) {
      setIsEditingProfile(true);
    }
  }, []);

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
    setUser(editedUser);
    setIsEditingProfile(false);
    // Here you would make an API call to update the user profile
    // Example: axios.put('/api/users/profile', editedUser)
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload to Cloudinary or similar service
      // For now, we'll just create a local URL as a placeholder
      const fileUrl = URL.createObjectURL(file);
      
      if (e.target.name === 'profilePic') {
        setEditedUser({...editedUser, profilePicUrl: fileUrl});
      } else if (e.target.name === 'resume') {
        setEditedUser({...editedUser, resumeUrl: fileUrl});
      }
    }
  };

  // Calculate profile completeness percentage
  const calculateProfileCompleteness = () => {
    const fields = [
      !!user.name, 
      !!user.email, 
      !!user.phone, 
      !!user.location, 
      user.skills.length > 0, 
      !!user.experience, 
      !!user.education, 
      !!user.profilePicUrl, 
      !!user.resumeUrl
    ];
    
    const completedFields = fields.filter(Boolean).length;
    return Math.round((completedFields / fields.length) * 100);
  };

  const profileCompleteness = calculateProfileCompleteness();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-blue-600">Resume Scorer</h1>
              </Link>
              <div className="ml-6 flex space-x-8">
                <Link to="/jobs" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-blue-500 text-sm font-medium">
                  Jobs
                </Link>
                <Link to="/companies" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium">
                  Companies
                </Link>
                <Link to="/services" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium">
                  Services
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center gap-4">
                <Link to="/notifications" className="text-gray-400 hover:text-gray-500 relative">
                  <span className="sr-only">Notifications</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
                </Link>
                <Link to="/messages" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Messages</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </Link>
                <div className="flex items-center">
                  <img 
                    src={user.profilePicUrl} 
                    alt={user.name} 
                    className="h-8 w-8 rounded-full object-cover"
                  />
                </div>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-5 sm:px-0">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Sidebar - 1/4 width */}
            <div className="w-full md:w-1/4">
              {isEditingProfile ? (
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
                        {/* Profile Photo */}
                        <div className="flex justify-center">
                          <div className="relative">
                            <img 
                              src={editedUser.profilePicUrl} 
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

                        {/* Name & Email */}
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
                            {editedUser.skills.map((skill, index) => (
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
                          onClick={() => setIsEditingProfile(false)}
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
                  {/* User Profile Card */}
                  <div className="bg-white shadow overflow-hidden rounded-lg">
                    <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
                      <div className="absolute bottom-0 transform translate-y-1/2 left-6">
                        <img
                          src={user.profilePicUrl}
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
                          onClick={() => setIsEditingProfile(true)}
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

                      {/* Profile Completion Progress */}
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

                      {/* Skills */}
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

                      {/* Resume */}
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
                            onClick={() => setIsEditingProfile(true)}
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

                  {/* Quick Actions */}
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
                          {user.appliedJobs.length > 0 && (
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
            </div>

            {/* Job Content - 3/4 width */}
            <div className="w-full md:w-3/4">
              {/* Job Search & Filter */}
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

              {/* Job List Tabs */}
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

              {/* Job Listings */}
              <div className="space-y-5">
                {jobs.map((job) => (
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
                            <p>{job.description}</p>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {job.skills.map((skill, index) => (
                              <span
                                key={index}
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  user.skills.includes(skill) 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {skill}
                                {user.skills.includes(skill) && (
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
                              <span>{job.salary}</span>
                            </div>
                            <div className="flex space-x-3">
                              <button
                                type="button"
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Apply Now
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
                ))}

                {/* Load More */}
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Load More Jobs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobSeekerDashboard;