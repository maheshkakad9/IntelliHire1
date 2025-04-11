import React from 'react';
import JobSeekerDashboard from '../components/JobSeeker';

const JobSeekerDashboardPage = () => {
  // Get user data from localStorage that was saved during registration
  const getUserData = () => {
    try {
      const userData = localStorage.getItem('userData');
      return userData ? JSON.parse(userData) : {};
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      return {};
    }
  };

  return <JobSeekerDashboard userData={getUserData()} />;
};

export default JobSeekerDashboardPage;