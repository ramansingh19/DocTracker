import React from 'react';
import { Link } from 'react-router-dom';
import './PatientLanding.css';

const PatientLanding = () => {
  return (
    <div className="patient-landing">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <div className="logo-icon">
              <span>👤</span>
            </div>
            <span className="nav-title">DocTracker - Patient Portal</span>
          </div>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/login" className="login-btn">Login</Link>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-background">
          <div className="hero-particles"></div>
        </div>
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>👤 Patient Portal</span>
            </div>
            <h1 className="hero-title">
              Never Wait in the Dark Again
              <span className="gradient-text"> Know Your Doctor's Status</span>
            </h1>
            <p className="hero-description">
              Track your doctor's real-time location, get accurate wait times, and receive instant notifications. 
              Make your hospital visits stress-free with our intelligent patient management system.
            </p>
            <div className="hero-actions">
              <Link to="/login" className="cta-button primary">
                <span>Check My Status</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/signup" className="cta-button secondary">
                <span>Create Account</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 8V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 11H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="dashboard-preview">
              <div className="preview-header">
                <div className="preview-dots">
                  <span></span><span></span><span></span>
                </div>
                <div className="preview-title">Patient Dashboard</div>
              </div>
              <div className="preview-content">
                <div className="preview-card active">
                  <div className="card-header">
                    <span className="card-icon">⏰</span>
                    <div className="card-info">
                      <h4>Your Queue Position</h4>
                      <p>Position #3 • Estimated wait: 45 min</p>
                    </div>
                    <div className="status-indicator waiting"></div>
                  </div>
                  <div className="card-stats">
                    <div className="stat-item">
                      <span className="stat-value">3</span>
                      <span className="stat-label">In Queue</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">45min</span>
                      <span className="stat-label">Wait Time</span>
                    </div>
                  </div>
                </div>
                <div className="preview-card">
                  <div className="card-header">
                    <span className="card-icon">👨‍⚕️</span>
                    <div className="card-info">
                      <h4>Dr. Sarah Johnson</h4>
                      <p>Cardiology • Available</p>
                    </div>
                    <div className="status-indicator online"></div>
                  </div>
                  <div className="card-stats">
                    <div className="stat-item">
                      <span className="stat-value">ETA</span>
                      <span className="stat-label">5 minutes</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">Live</span>
                      <span className="stat-label">Tracking</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Patient-Focused Features</h2>
            <p className="section-subtitle">
              Everything you need for a stress-free hospital visit
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Real-Time Queue Tracking</h3>
              <p>See your exact position in the queue and get accurate wait time estimates. No more guessing games.</p>
              <div className="feature-highlight">
                <span>⚡ Live Updates</span>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Doctor Location Tracking</h3>
              <p>Know exactly where your doctor is and when they'll arrive. Get precise ETA updates.</p>
              <div className="feature-highlight">
                <span>📍 GPS Accurate</span>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Smart Notifications</h3>
              <p>Get instant alerts when your turn is approaching, doctor arrives, or queue status changes.</p>
              <div className="feature-highlight">
                <span>🔔 Instant Alerts</span>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Digital Check-In</h3>
              <p>Check in remotely and join the queue from anywhere. No need to wait at the hospital.</p>
              <div className="feature-highlight">
                <span>📱 Remote Check-in</span>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M8 7V3C8 2.44772 8.44772 2 9 2H15C15.5523 2 16 2.44772 16 3V7M8 7H6C4.89543 7 4 7.89543 4 9V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V9C20 7.89543 19.1046 7 18 7H16M8 7H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Appointment History</h3>
              <p>View your past appointments, doctor notes, and medical history in one convenient place.</p>
              <div className="feature-highlight">
                <span>📋 Complete History</span>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12L10.5 14.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Emergency Priority</h3>
              <p>Urgent cases get priority treatment. The system automatically adjusts queue for emergencies.</p>
              <div className="feature-highlight">
                <span>🚨 Priority Care</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="benefits">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Patients Love DocTracker</h2>
            <p className="section-subtitle">
              Join thousands of patients who have transformed their hospital experience
            </p>
          </div>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-number">60%</div>
              <h3>Reduction in Wait Time</h3>
              <p>Patients spend significantly less time waiting with our intelligent queue management.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-number">95%</div>
              <h3>Patient Satisfaction</h3>
              <p>Overwhelming majority of patients report improved experience and reduced anxiety.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-number">24/7</div>
              <h3>Always Available</h3>
              <p>Check your status anytime, anywhere. No more uncertainty about your appointment.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready for a Better Hospital Experience?</h2>
            <p>Join thousands of patients who have made their hospital visits stress-free and efficient.</p>
            <div className="cta-buttons">
              <Link to="/login" className="cta-button primary large">
                <span>Check My Status</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/signup" className="cta-button secondary large">
                <span>Create Patient Account</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 8V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 11H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="logo-icon">
                  <span>👤</span>
                </div>
                <span>DocTracker</span>
              </div>
              <p>Making healthcare accessible and stress-free for every patient.</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>For Patients</h4>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                <Link to="/patient-status">Status Check</Link>
                <a href="#">Features</a>
              </div>
              <div className="footer-column">
                <h4>Support</h4>
                <a href="#">Help Center</a>
                <a href="#">FAQ</a>
                <a href="#">Contact</a>
                <a href="#">Emergency</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 DocTracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PatientLanding;
