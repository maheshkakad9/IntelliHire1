import React from 'react';
import JobSeekerRegister from '../components/JobSeekerRegister';

const JobSeekerRegisterPage = () => {
  const handleRegister = (formData) => {
    console.log('Registering job seeker with:', formData);
    // Call backend API to register the job seeker
    // You would typically use fetch or axios here
  };

  return <JobSeekerRegister onRegister={handleRegister} />;
};

export default JobSeekerRegisterPage;