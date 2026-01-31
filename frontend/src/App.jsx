import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import AdminLanding from './components/AdminLanding';
import DoctorDashboard from './components/DoctorDashboard';
import DoctorLanding from './components/DoctorLanding';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import PatientLanding from './components/PatientLanding';
import PatientStatus from './components/PatientStatus';
import Signup from './components/Signup';
import UserManager from './components/UserManager';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-100">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/doctor-landing" element={<DoctorLanding />} />
          <Route path="/patient-landing" element={<PatientLanding />} />
          <Route path="/admin-landing" element={<AdminLanding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/patient-status" element={<PatientStatus />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
        <UserManager />
      </div>
    </Router>
  );
}

export default App;