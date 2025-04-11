// src/pages/LoginPage.jsx
import Login from '../components/Login';

const LoginPage = () => {
  const handleLogin = credentials => {
    console.log('Logging in with:', credentials);
    // Call backend API
  };

  return <Login onLogin={handleLogin} />;
};

export default LoginPage;
