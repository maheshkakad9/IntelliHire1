import React, { useState, useEffect } from 'react';
import Navbar from './Layout/Navbar';
import Profile from './Profile';
import Jobs from './Jobs';

const JobSeekerDashboard = ({ userData }) => {
  // Set initial user state with userData from registration
  const [user, setUser] = useState({
    name: userData?.name || "Your Name",
    email: userData?.email || "example@email.com",
    phone: userData?.phone || "",
    location: userData?.location || "",
    skills: userData?.skills || [],
    experience: userData?.experience || "",
    education: userData?.education || "",
    profilePicUrl: userData?.profilePicUrl || "https://via.placeholder.com/150",
    resumeUrl: userData?.resumeUrl || null,
    appliedJobs: userData?.appliedJobs || []
  });

  const [isEditing, setIsEditing] = useState(false);

  // Update user profile when edited
  const handleUpdateProfile = (updatedUserData) => {
    setUser({...user, ...updatedUserData});
    // In a real app, you would also update the backend
  };

  // Update applied jobs list
  const handleUpdateAppliedJobs = (updatedAppliedJobs) => {
    setUser({...user, appliedJobs: updatedAppliedJobs});
    // In a real app, you would also update the backend
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-5 sm:px-0">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left sidebar - Profile */}
            <div className="w-full md:w-1/4">
              <Profile 
                user={user} 
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                onUpdateProfile={handleUpdateProfile}
              />
            </div>
            
            {/* Right content - Jobs */}
            <div className="w-full md:w-3/4">
              <Jobs 
                user={user} 
                onUpdateAppliedJobs={handleUpdateAppliedJobs} 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobSeekerDashboard;