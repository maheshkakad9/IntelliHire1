import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import JobSeekerRegisterPage from './pages/JobSeekerRegisterPage';
import RecruiterRegisterPage from './pages/RecruiterRegisterPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import JobSeekerDashboardPage from './pages/JobSeekerDashboardPage';
import RecruiterDashboardPage from './pages/RecruiterDashboardPage';
import VerificationCheck from './components/Recruiter/VerificationCheck';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recruiter/dashboard" element={<VerificationCheck />} />
        <Route path="/candidate/register" element={<JobSeekerRegisterPage />} />
        <Route path="/recruiter/register" element={<RecruiterRegisterPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/candidate/dashboard" element={<JobSeekerDashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;