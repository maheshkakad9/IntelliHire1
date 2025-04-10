import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import JobSeekerRegisterPage from './pages/JobSeekerRegisterPage';
import RecruiterRegisterPage from './pages/RecruiterRegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/candidate/register" element={<JobSeekerRegisterPage />} />
        <Route path="/recruiter/register" element={<RecruiterRegisterPage />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;