import React, { useState, useEffect } from 'react';

const Profile = ({ recruiter, onUpdateProfile, isEditing, setIsEditing, onFinishEditing }) => {
  const [editedRecruiter, setEditedRecruiter] = useState({...recruiter});
  
  // Update editedRecruiter when recruiter changes
  useEffect(() => {
    setEditedRecruiter({...recruiter});
  }, [recruiter]);
  
  const handleSaveProfile = () => {
    onUpdateProfile(editedRecruiter);
    if (setIsEditing) {
      setIsEditing(false);
    } else if (onFinishEditing) {
      onFinishEditing();
    }
  };
  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a local URL for preview
      const fileUrl = URL.createObjectURL(file);
      setEditedRecruiter({...editedRecruiter, profilePicUrl: fileUrl});
    }
  };
  
  // Display edit form if editing mode is on
  if (isEditing) {
    return (
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recruiter Profile</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Update your personal and company details.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <form>
            <div className="space-y-6">
              {/* Profile Photo */}
              <div className="flex justify-center">
                <div className="relative">
                  <img 
                    src={editedRecruiter.profilePicUrl} 
                    alt={editedRecruiter.name} 
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

              {/* Personal Information */}
              <div>
                <h4 className="text-sm font-medium text-gray-800">Personal Information</h4>
                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={editedRecruiter.name}
                      onChange={(e) => setEditedRecruiter({...editedRecruiter, name: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={editedRecruiter.email}
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
                      value={editedRecruiter.phone}
                      onChange={(e) => setEditedRecruiter({...editedRecruiter, phone: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div>
                <h4 className="text-sm font-medium text-gray-800">Company Information</h4>
                <div className="mt-3 grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      id="companyName"
                      value={editedRecruiter.companyName}
                      onChange={(e) => setEditedRecruiter({...editedRecruiter, companyName: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="companyWebsite" className="block text-sm font-medium text-gray-700">Company Website</label>
                    <input
                      type="url"
                      name="companyWebsite"
                      id="companyWebsite"
                      placeholder="https://example.com"
                      value={editedRecruiter.companyWebsite}
                      onChange={(e) => setEditedRecruiter({...editedRecruiter, companyWebsite: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setIsEditing ? setIsEditing(false) : onFinishEditing()}
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
    );
  }
  
  // Display profile information
  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
        <div className="absolute bottom-0 transform translate-y-1/2 left-6">
          <img
            src={recruiter.profilePicUrl}
            alt={recruiter.name}
            className="h-24 w-24 rounded-full border-4 border-white object-cover"
          />
        </div>
      </div>
      <div className="px-6 pt-16 pb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">{recruiter.name}</h2>
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
        <p className="mt-1 text-sm text-gray-500">{recruiter.companyName}</p>
        
        <div className="mt-6 space-y-4">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="ml-2 text-sm text-gray-500">{recruiter.email}</span>
          </div>
          {recruiter.phone && (
            <div className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="ml-2 text-sm text-gray-500">{recruiter.phone}</span>
            </div>
          )}
          {recruiter.companyWebsite && (
            <div className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
              </svg>
              <a 
                href={recruiter.companyWebsite} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="ml-2 text-sm text-blue-500 hover:underline"
              >
                {recruiter.companyWebsite.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              recruiter.verificationStatus === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {recruiter.verificationStatus === 'approved' ? 'Verified' : 'Unverified'}
            </span>
          </div>
          <div className="ml-3">
            <p className="text-xs text-gray-500">
              {recruiter.verificationStatus === 'approved' 
                ? 'Your company is verified' 
                : 'Please complete verification'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
