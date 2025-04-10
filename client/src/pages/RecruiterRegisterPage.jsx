import React from 'react';
import RecruiterRegister from '../components/RecruiterRegister';

const RecruiterRegisterPage = () => {
  const handleRegister = (formData) => {
    console.log('Registering recruiter with:', formData);
    // Call backend API to register the recruiter
    // You would typically use fetch or axios here
  };

  return <RecruiterRegister onRegister={handleRegister} />;
};

export default RecruiterRegisterPage;