import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [showAddDoctorForm , setShowAddDoctorForm] = useState(false);
  const [newDoctor , setNewDoctor] = useState({
    name : "",
    profession : "",
    specialty : "",
  })
  const handleAddDoctor = () => {
  if (!newDoctor.name || !newDoctor.profession || !newDoctor.specialty) {
    alert("Please fill all fields!");
    return;
  }

  const newEntry = {
    id: doctors.length + 1,
    name: newDoctor.name,
    specialty: newDoctor.specialty,
    status: "available",
    eta: "N/A",
    patients: 0,
  };

  const updatedDoctors = [...doctors, newEntry];
  setDoctors(updatedDoctors);

  localStorage.setItem("doctors", JSON.stringify(updatedDoctors));

  setShowAddDoctorForm(false);
  setNewDoctor({ name: "", profession: "", specialty: "" });
};

  
  const [stats, setStats] = useState({
    totalDoctors: 0,
    activeDoctors: 0,
    totalPatients: 0,
    waitingPatients: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));

    // Mock data
    const storedDoctors = localStorage.getItem("doctors");
  const doctorsData = storedDoctors ? JSON.parse(storedDoctors) : [
    { id: 1, name: 'Dr. Aman Kumar', status: 'available', eta: '5 min', patients: 8, specialty: 'Cardiology' },
    { id: 2, name: 'Dr. John Snow', status: 'consulting', eta: 'N/A', patients: 12, specialty: 'Orthopedics' },
    { id: 3, name: 'Dr. Nikita Verma', status: 'in_transit', eta: '15 min', patients: 5, specialty: 'Pediatrics' },
    { id: 4, name: 'Dr. Ravi Gupta', status: 'available', eta: 'N/A', patients: 3, specialty: 'Neurology' },
  ];

    const mockPatients = [
      { id: 1, name: 'John Doe', doctor: 'Dr. Sarah Johnson', status: 'waiting', waitTime: '30 min' },

      { id: 2, name: 'Jane Smith', doctor: 'Dr. Michael Chen', status: 'in_consultation', waitTime: 'N/A' },
      { id: 3, name: 'Mike Johnson', doctor: 'Dr. Sarah Johnson', status: 'waiting', waitTime: '45 min' },
      { id: 4, name: 'Sarah Wilson', doctor: 'Dr. Emily', status: 'waiting', waitTime: '20 min' }
    ];

    setDoctors(doctorsData);
    setPatients(mockPatients);
    setStats({
      totalDoctors: doctorsData.length,
      activeDoctors: doctorsData.filter(d => d.status !== 'offline').length,
      totalPatients: mockPatients.length,
      waitingPatients: mockPatients.filter(p => p.status === 'waiting').length
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return '#10b981';
      case 'consulting': return '#f59e0b';
      case 'in_transit': return '#3b82f6';
      case 'waiting': return '#ef4444';
      case 'in_consultation': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'Available';
      case 'consulting': return 'Consulting';
      case 'in_transit': return 'In Transit';
      case 'waiting': return 'Waiting';
      case 'in_consultation': return 'In Consultation';
      default: return 'Unknown';
    }
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo-section">
              <div className="logo-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
                  <path d="M12 18L13.09 14.26L20 13L13.09 12.74L12 6L10.91 12.74L4 13L10.91 14.26L12 18Z" fill="currentColor"/>
                </svg>
              </div>
              <h1>DocTracker Admin</h1>
            </div>
          </div>
          <div className="header-right">
            <div className="user-info">
              <div className="user-avatar">
                <span>👨‍💼</span>
              </div>
              <div className="user-details">
                <span className="user-name">{user.name}</span>
                <span className="user-role">Administrator</span>
              </div>
              <button onClick={handleLogout} className="logout-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard-container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👨‍⚕️</div>
            <div className="stat-info">
              <span className="stat-number">{stats.totalDoctors}</span>
              <span className="stat-label">Total Doctors</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <span className="stat-number">{stats.activeDoctors}</span>
              <span className="stat-label">Active Doctors</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <span className="stat-number">{stats.totalPatients}</span>
              <span className="stat-label">Total Patients</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏰</div>
            <div className="stat-info">
              <span className="stat-number">{stats.waitingPatients}</span>
              <span className="stat-label">Waiting Patients</span>
            </div>
          </div>
        </div>

        <div className="content-grid">
          <div className="doctors-section">
            <h2>Doctor Status</h2>
            <div className="doctors-list">
              {doctors.map(doctor => (
                <div key={doctor.id} className="doctor-card">
                  <div className="doctor-info">
                    <div className="doctor-avatar">👨‍⚕️</div>
                    <div className="doctor-details">
                      <h4>{doctor.name}</h4>
                      <p>{doctor.specialty} • {doctor.patients} patients today</p>
                    </div>
                  </div>
                  <div className="doctor-status">
                    <div 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(doctor.status) }}
                    >
                      {getStatusText(doctor.status)}
                    </div>
                    <span className="eta">ETA: {doctor.eta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="patients-section">
            <h2>Patient Queue</h2>
            <div className="patients-list">
              {patients.map(patient => (
                <div key={patient.id} className="patient-card">
                  <div className="patient-info">
                    <div className="patient-avatar">👤</div>
                    <div className="patient-details">
                      <h4>{patient.name}</h4>
                      <p>Doctor: {patient.doctor}</p>
                    </div>
                  </div>
                  <div className="patient-status">
                    <div 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(patient.status) }}
                    >
                      {getStatusText(patient.status)}
                    </div>
                    <span className="wait-time">Wait: {patient.waitTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


        <div className="management-section">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button  className="action-btn primary"  onClick={() => setShowAddDoctorForm(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span >Add Doctor</span>
              </button>
{/* Popup Form */}
{showAddDoctorForm && (
  <div className="modal-overlay">
    <div className="modal">
      <h3>Add New Doctor</h3>
      <input
        type="text"
        placeholder="Doctor Name"
        value={newDoctor.name}
        onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Profession"
        value={newDoctor.profession}
        onChange={(e) => setNewDoctor({ ...newDoctor, profession: e.target.value })}
      />
      <input
        type="text"
        placeholder="Specialization"
        value={newDoctor.specialty}
        onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
      />
      <div className="modal-actions">
        <button onClick={handleAddDoctor}>Save</button>
        <button className="cancel" onClick={() => setShowAddDoctorForm(false)}>Cancel</button>
      </div>
    </div>
  </div>
)}

            <button className="action-btn secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M8 7V3C8 2.44772 8.44772 2 9 2H15C15.5523 2 16 2.44772 16 3V7M8 7H6C4.89543 7 4 7.89543 4 9V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V9C20 7.89543 19.1046 7 18 7H16M8 7H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Schedule Management</span>
            </button>
            <button className="action-btn tertiary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 17V7M15 17V7M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Reports</span>
            </button>
            <button className="action-btn quaternary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.2569 9.77251 19.9859C9.5799 19.7148 9.31074 19.5053 9 19.38C8.69838 19.2469 8.36381 19.2072 8.03941 19.266C7.71502 19.3248 7.41568 19.4795 7.18 19.71L7.12 19.77C6.93425 19.956 6.71368 20.1035 6.47088 20.2041C6.22808 20.3048 5.96783 20.3566 5.705 20.3566C5.44217 20.3566 5.18192 20.3048 4.93912 20.2041C4.69632 20.1035 4.47575 19.956 4.29 19.77C4.10405 19.5843 3.95653 19.3637 3.85588 19.1209C3.75523 18.8781 3.70343 18.6178 3.70343 18.355C3.70343 18.0922 3.75523 17.8319 3.85588 17.5891C3.95653 17.3463 4.10405 17.1257 4.29 16.94L4.35 16.88C4.58054 16.6443 4.73519 16.345 4.794 16.0206C4.85282 15.6962 4.81312 15.3616 4.68 15.06C4.55324 14.7642 4.34276 14.512 4.07447 14.3343C3.80618 14.1566 3.49179 14.0613 3.17 14.06H3C2.46957 14.06 1.96086 13.8493 1.58579 13.4742C1.21071 13.0991 1 12.5904 1 12.06C1 11.5296 1.21071 11.0209 1.58579 10.6458C1.96086 10.2707 2.46957 10.06 3 10.06H3.09C3.42099 10.0523 3.742 9.94512 4.01309 9.75251C4.28417 9.5599 4.49372 9.29074 4.62 8.98C4.75312 8.67838 4.79282 8.34381 4.734 8.01941C4.67519 7.69502 4.52054 7.39568 4.29 7.16L4.23 7.1C4.04405 6.91425 3.89653 6.69368 3.79588 6.45088C3.69523 6.20808 3.64343 5.94783 3.64343 5.685C3.64343 5.42217 3.69523 5.16192 3.79588 4.91912C3.89653 4.67632 4.04405 4.45575 4.23 4.27C4.41575 4.08405 4.63632 3.93653 4.87912 3.83588C5.12192 3.73523 5.38217 3.68343 5.645 3.68343C5.90783 3.68343 6.16808 3.73523 6.41088 3.83588C6.65368 3.93653 6.87425 4.08405 7.06 4.27L7.12 4.33C7.35568 4.56054 7.65502 4.71519 7.97941 4.774C8.30381 4.83282 8.63838 4.79312 8.94 4.66H9C9.29577 4.53324 9.54802 4.32276 9.72569 4.05447C9.90337 3.78618 9.99872 3.47179 10 3.15V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
