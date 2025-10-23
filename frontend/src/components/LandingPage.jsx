import React from 'react';
import { Link } from 'react-router-dom';
import IndustryFeatures from './IndustryFeatures';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <div className="logo-icon">
              <img src="https://i.pinimg.com/736x/3b/df/57/3bdf5702d98a357455ff4027786c3d96.jpg" alt="" />
              {/* <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
                <path d="M12 18L13.09 14.26L20 13L13.09 12.74L12 6L10.91 12.74L4 13L10.91 14.26L12 18Z" fill="currentColor"/>
              </svg> */}
            </div>
            <span className="nav-title">DocTracker</span>
          </div>
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#contact" className="nav-link">Contact</a>
            <Link to="/login" className="login-btn">Get Started</Link>
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
              <span>🏥 Healthcare Innovation</span>
            </div>
            <h1 className="hero-title">
              Transform Your Hospital's
              <span className="gradient-text"> Patient Experience</span>
            </h1>
            <p className="hero-description">
              Revolutionize healthcare delivery with real-time doctor tracking, intelligent queue management, 
              and seamless patient communication. Reduce wait times by up to 60% and boost patient satisfaction.
            </p>
            <div className="hero-actions">
              <Link to="/login" className="cta-button primary">
                <span>Get Started</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <button className="cta-button secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                </svg>
                <a href="https://www.youtube.com/watch?v=VRGFnhOpQU0&pp=ygUTbWVpY2FsIHJlbHRlZCB2aWRvcw%3D%3D" target='blank'><span>Watch Demo</span></a>
              </button>
            </div>
            
            {/* Role Selection Section */}
            <div className="role-selection">
              <h3>Choose Your Role</h3>
              <div className="role-buttons">
                <Link to="/doctor-landing" className="role-btn doctor">
                  <div className="role-icon">👨‍⚕️</div>
                  <div className="role-content">
                    <h4>For Doctors</h4>
                    <p>Manage your schedule, update status, and track patients</p>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                
                <Link to="/patient-landing" className="role-btn patient">
                  <div className="role-icon">👤</div>
                  <div className="role-content">
                    <h4>For Patients</h4>
                    <p>Track your queue position and doctor availability</p>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                
                <Link to="/admin-landing" className="role-btn admin">
                  <div className="role-icon">👨‍💼</div>
                  <div className="role-content">
                    <h4>For Administrators</h4>
                    <p>Monitor system performance and manage operations</p>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Hospitals</span>
              </div>
              <div className="stat">
                <span className="stat-number">60%</span>
                <span className="stat-label">Wait Reduction</span>
              </div>
              <div className="stat">
                <span className="stat-number">99.9%</span>
                <span className="stat-label">Uptime</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="dashboard-preview">
              <div className="preview-header">
                <div className="preview-dots">
                  <span></span><span></span><span></span>
                </div>
                <div className="preview-title">DocTracker Dashboard</div>
              </div>
              <div className="preview-content">
                <div className="preview-card active">
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
                      <span className="stat-value">8</span>
                      <span className="stat-label">Patients Today</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">5min</span>
                      <span className="stat-label">Avg. Wait</span>
                    </div>
                  </div>
                </div>
                <div className="preview-card">
                  <div className="card-header">
                    <span className="card-icon">👩‍⚕️</span>
                    <div className="card-info">
                      <h4>Dr. Michael Chen</h4>
                      <p>Orthopedics • In Transit</p>
                    </div>
                    <div className="status-indicator transit"></div>
                  </div>
                  <div className="card-stats">
                    <div className="stat-item">
                      <span className="stat-value">12</span>
                      <span className="stat-label">Patients Today</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">15min</span>
                      <span className="stat-label">ETA</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Powerful Features for Modern Healthcare</h2>
            <p className="section-subtitle">
              Everything you need to streamline operations and enhance patient care
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
              <h3>Real-Time Tracking</h3>
              <p>Monitor doctor locations and arrival times with GPS precision. Patients get accurate ETAs and automatic notifications.</p>
              <div className="feature-highlight">
                <span>⚡ Live Updates</span>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M9 11H15M9 15H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Smart Queue Management</h3>
              <p>Intelligent patient queuing with priority handling, virtual tokens, and automated check-in reminders.</p>
              <div className="feature-highlight">
                <span>🤖 AI-Powered</span>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Instant Notifications</h3>
              <p>Multi-channel alerts via SMS, email, and push notifications keep everyone informed and engaged.</p>
              <div className="feature-highlight">
                <span>📱 Multi-Channel</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Simple setup, powerful results</p>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <h3>Setup & Integration</h3>
              <p>Quick installation with existing hospital systems. No complex configurations required.</p>
            </div>
            <div className="step-card">
              <div className="step-number">02</div>
              <h3>Doctor Onboarding</h3>
              <p>Doctors download the app and start sharing their location and status updates.</p>
            </div>
            <div className="step-card">
              <div className="step-number">03</div>
              <h3>Patient Engagement</h3>
              <p>Patients receive real-time updates and can check their queue position anytime.</p>
            </div>
          </div>
        </div>
      </section>

      <IndustryFeatures />

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="logo-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
                    <path d="M12 18L13.09 14.26L20 13L13.09 12.74L12 6L10.91 12.74L4 13L10.91 14.26L12 18Z" fill="currentColor"/>
                  </svg>
                </div>
                <span>DocTracker</span>
              </div>
              <p>Transforming healthcare delivery through intelligent patient management.</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#how-it-works">How It Works</a>
                <a href="#">Pricing</a>
                <a href="#">API</a>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <a href="#">About</a>
                <a href="#">Careers</a>
                <a href="#">Contact</a>
                <a href="#">Blog</a>
              </div>
              <div className="footer-column">
                <h4>Support</h4>
                <a href="#">Help Center</a>
                <a href="#">Documentation</a>
                <a href="#">Status</a>
                <a href="#">Security</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 DocTracker. All rights reserved.</p>
            <div className="footer-social">
              <a href="#">Twitter</a>
              <a href="#">LinkedIn</a>
              <a href="#">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
