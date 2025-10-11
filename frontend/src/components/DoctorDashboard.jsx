import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('available');
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [eta, setEta] = useState('N/A');
  const [locationSharing, setLocationSharing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));

    // Mock location - in real app, this would use GPS
    setLocation({ lat: 28.6139, lng: 77.2090 }); // Delhi coordinates
    setEta('15 minutes');
  }, [navigate]);

  const handleStatusUpdate = async () => {
    setIsUpdating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsUpdating(false);
    alert('Status updated successfully!');
  };

  const handleLocationSharing = async (enabled) => {
    setLocationSharing(enabled);
    if (enabled) {
      // Simulate location sharing
      setEta('15 minutes');
    } else {
      setEta('N/A');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="doctor-dashboard">
      <header className="dashboard-header">
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
                <span>👨‍⚕️</span>
              </div>
              <div className="user-details">
                <span className="user-name">{user.name}</span>
                <span className="user-role">Doctor</span>
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
        <div className="dashboard-grid">
          <div className="status-card">
            <div className="card-header">
              <h3>Current Status</h3>
              <div className="status-indicator">
                <div className={`status-dot ${status}`}></div>
                <span>{status.replace('_', ' ')}</span>
              </div>
            </div>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
              className="status-select"
            >
              <option value="available">Available</option>
              <option value="in_transit">In Transit</option>
              <option value="consulting">Consulting</option>
              <option value="in_ot">In OT</option>
              <option value="busy">Busy</option>
            </select>
            <button 
              onClick={handleStatusUpdate}
              disabled={isUpdating}
              className="update-btn"
            >
              {isUpdating ? (
                <>
                  <div className="spinner"></div>
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <span>Update Status</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
          </div>

          <div className="location-card">
            <div className="card-header">
              <h3>Location Sharing</h3>
              <div className="location-toggle">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={locationSharing}
                    onChange={(e) => handleLocationSharing(e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
            {locationSharing && (
              <div className="location-info">
                <div className="location-detail">
                  <span className="label">Current Location:</span>
                  <span className="value">{location.lat.toFixed(4)}, {location.lng.toFixed(4)}</span>
                </div>
                <div className="location-detail">
                  <span className="label">ETA to Hospital:</span>
                  <span className="value eta">{eta}</span>
                </div>
              </div>
            )}
          </div>

          <div className="patients-card">
            <div className="card-header">
              <h3>Today's Patients</h3>
              <span className="patient-count">12 Total</span>
            </div>
            <div className="patient-list">
              <div className="patient-item">
                <div className="patient-info">
                  <span className="patient-name">John Doe</span>
                  <span className="patient-time">10:00 AM</span>
                </div>
                <span className="patient-status waiting">Waiting</span>
              </div>
              <div className="patient-item">
                <div className="patient-info">
                  <span className="patient-name">Jane Smith</span>
                  <span className="patient-time">10:30 AM</span>
                </div>
                <span className="patient-status waiting">Waiting</span>
              </div>
              <div className="patient-item">
                <div className="patient-info">
                  <span className="patient-name">Mike Johnson</span>
                  <span className="patient-time">11:00 AM</span>
                </div>
                <span className="patient-status upcoming">Upcoming</span>
              </div>
              <div className="patient-item">
                <div className="patient-info">
                  <span className="patient-name">Sarah Wilson</span>
                  <span className="patient-time">11:30 AM</span>
                </div>
                <span className="patient-status upcoming">Upcoming</span>
              </div>
            </div>
          </div>

          <div className="stats-card">
            <div className="card-header">
              <h3>Today's Statistics</h3>
            </div>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <span className="stat-number">12</span>
                  <span className="stat-label">Patients Seen</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">⏰</div>
                <div className="stat-content">
                  <span className="stat-number">8</span>
                  <span className="stat-label">In Queue</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">⏱️</div>
                <div className="stat-content">
                  <span className="stat-number">2.5h</span>
                  <span className="stat-label">Total Time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
