import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientStatus.css';
import authService, { getStoredUser } from '../services/authService';

const PatientStatus = () => {
  const [user, setUser] = useState(null);
  const [doctorStatus, setDoctorStatus] = useState('available');
  const [eta] = useState('N/A');
  const [queuePosition, setQueuePosition] = useState(3);
  const [estimatedWaitTime] = useState('1 hour');
  const [isConnected] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(storedUser);

    // Mock real-time updates
    const interval = setInterval(() => {
      // Simulate status changes
      const statuses = ['available', 'consulting', 'in_transit'];
      setDoctorStatus(statuses[Math.floor(Math.random() * statuses.length)]);
      
      // Simulate queue position updates
      if (Math.random() > 0.7) {
        setQueuePosition(prev => Math.max(1, prev - 1));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleLogout = () => {
    authService.clearSession();
    navigate('/login');
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return '#10b981';
      case 'consulting': return '#f59e0b';
      case 'in_transit': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'Available';
      case 'consulting': return 'Consulting';
      case 'in_transit': return 'In Transit';
      default: return 'Unknown';
    }
  };

  return (
    <div className="patient-status">
      <header className="status-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo-section">
              <div className="logo-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
                  <path d="M12 18L13.09 14.26L20 13L13.09 12.74L12 6L10.91 12.74L4 13L10.91 14.26L12 18Z" fill="currentColor"/>
                </svg>
              </div>
              <h1>DocTracker</h1>
            </div>
          </div>
          <div className="header-right">
            <div className="user-info">
              <div className="user-avatar">
                <span>👤</span>
              </div>
              <div className="user-details">
                <span className="user-name">{user.name}</span>
                <span className="user-role">Patient</span>
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

      <div className="status-container">
        <div className="status-grid">
          <div className="main-status-card">
            <h2>Your Current Status</h2>
            <div className="queue-info">
              <div className="queue-position">
                <span className="position-number">{queuePosition}</span>
                <span className="position-label">in queue</span>
              </div>
              <div className="wait-time">
                <span className="time-number">{estimatedWaitTime}</span>
                <span className="time-label">estimated wait</span>
              </div>
            </div>
            <div className="connection-status">
              <div className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
                <span className="status-dot"></span>
                <span>{isConnected ? 'Live Updates' : 'Offline'}</span>
              </div>
            </div>
          </div>

          <div className="doctor-status-card">
            <h3>Doctor Status</h3>
            <div className="doctor-info">
              <div className="doctor-avatar">
                <span>👨‍⚕️</span>
              </div>
              <div className="doctor-details">
                <h4>Dr. Sarah Johnson</h4>
                <p>Cardiology</p>
                <div 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(doctorStatus) }}
                >
                  {getStatusText(doctorStatus)}
                </div>
              </div>
            </div>
            <div className="eta-info">
              <span className="eta-label">ETA to Hospital:</span>
              <span className="eta-value">{eta}</span>
            </div>
          </div>

          <div className="notifications-card">
            <h3>Recent Notifications</h3>
            <div className="notification-list">
              <div className="notification-item">
                <div className="notification-icon">🔔</div>
                <div className="notification-content">
                  <p>Your queue position has been updated</p>
                  <span className="notification-time">2 minutes ago</span>
                </div>
              </div>
              <div className="notification-item">
                <div className="notification-icon">📋</div>
                <div className="notification-content">
                  <p>Dr. Johnson is now available</p>
                  <span className="notification-time">5 minutes ago</span>
                </div>
              </div>
              <div className="notification-item">
                <div className="notification-icon">⏰</div>
                <div className="notification-content">
                  <p>Your estimated wait time: 45 minutes</p>
                  <span className="notification-time">10 minutes ago</span>
                </div>
              </div>
            </div>
          </div>

          <div className="queue-info-card">
            <h3>Queue Information</h3>
            <div className="queue-stats">
              <div className="stat-item">
                <span className="stat-number">8</span>
                <span className="stat-label">Patients Ahead</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">12</span>
                <span className="stat-label">Total in Queue</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">15min</span>
                <span className="stat-label">Avg. Consult Time</span>
              </div>
            </div>
            <div className="queue-actions">
              <button className="action-btn primary">Check In</button>
              <button className="action-btn secondary">Reschedule</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientStatus;
