// src/pages/RegisterPage.jsx
import Register from '../components/Register';

const RegisterPage = () => {
  const handleRegister = userInfo => {
    console.log('Registering with:', userInfo);
    // Call backend API
  };

  return <Register onRegister={handleRegister} />;
};

export default RegisterPage;
