import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import authService, { clearSession, getStoredUser } from '../services/authService';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'doctor',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Load saved credentials on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    const savedRole = localStorage.getItem('savedRole');
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    
    if (rememberMe && savedEmail) {
      setFormData(prev => ({
        ...prev,
        email: savedEmail,
        role: savedRole || 'doctor',
        rememberMe: true
      }));
    }
  }, []);

  // Get users from localStorage (registered users)
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { user } = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      if (user.role !== formData.role) {
        setError(`Your account is registered as ${user.role}. Please switch the role selector.`);
        clearSession();
        setLoading(false);
        return;
      }

      // Save credentials if "Remember Me" is checked
      if (formData.rememberMe) {
        localStorage.setItem('savedEmail', formData.email);
        localStorage.setItem('savedRole', user.role);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('savedEmail');
        localStorage.removeItem('savedRole');
        localStorage.removeItem('rememberMe');
      }

      switch (user.role) {
        case 'doctor':
          navigate('/doctor-dashboard');
          break;
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'patient':
          navigate('/patient-status');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      const storedUser = getStoredUser();
      if (!storedUser) {
        clearSession();
      }
      setError(err.message || 'Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-section">
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
                <path d="M12 18L13.09 14.26L20 13L13.09 12.74L12 6L10.91 12.74L4 13L10.91 14.26L12 18Z" fill="currentColor"/>
              </svg>
            </div>
            <h2>Welcome Back</h2>
          </div>
          <p>Sign in to your DocTracker account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="role">Login as</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
              <option value="patient">Patient</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="form-input"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="form-input"
              autoComplete="current-password"
            />
          </div>

          <div className="form-group remember-me">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="checkbox-input"
              />
              <span className="checkbox-text">Remember me</span>
            </label>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/signup" className="link">Create Account</Link></p>
          <p><Link to="/" className="link">← Back to Home</Link></p>
        </div>

        <div className="demo-credentials">
          <h4>Demo Credentials:</h4>
          <div className="credential-item">
            <span className="role-badge doctor">Doctor</span>
            <span>doctor@example.com / password123</span>
          </div>
          <div className="credential-item">
            <span className="role-badge admin">Admin</span>
            <span>admin@example.com / password123</span>
          </div>
          <div className="credential-item">
            <span className="role-badge patient">Patient</span>
            <span>patient@example.com / password123</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
