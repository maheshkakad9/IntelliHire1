import React from 'react';
import RecruiterDashboard from '../components/Recruiter';

const RecruiterDashboardPage = () => {
  // Get recruiter data from localStorage that was saved during registration
  const getRecruiterData = () => {
    try {
      const recruiterData = localStorage.getItem('recruiterData');
      return recruiterData ? JSON.parse(recruiterData) : {};
    } catch (error) {
      console.error('Error parsing recruiter data from localStorage:', error);
      return {};
    }
  };

  return <RecruiterDashboard recruiterData={getRecruiterData()} />;
};

export default RecruiterDashboardPage;