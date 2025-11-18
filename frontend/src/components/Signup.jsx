import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import authService from '../services/authService';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'doctor'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      setSuccess('Account created successfully! Redirecting...');

      setTimeout(() => {
        switch (formData.role) {
          case 'doctor':
            navigate('/doctor-dashboard');
            break;
          case 'admin':
            navigate('/admin-dashboard');
            break;
          default:
            navigate('/login');
        }
      }, 1500);
    } catch (err) {
      setError(err.message || 'Unable to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <div className="logo-section">
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
                <path d="M12 18L13.09 14.26L20 13L13.09 12.74L12 6L10.91 12.74L4 13L10.91 14.26L12 18Z" fill="currentColor"/>
              </svg>
            </div>
            <h2>Create Account</h2>
          </div>
          <p>Join DocTracker and start transforming healthcare</p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="role">Register as</label>
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
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="form-input"
              autoComplete="name"
            />
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
              placeholder="Create a strong password"
              minLength="8"
              className="form-input"
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
              className="form-input"
              autoComplete="new-password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button 
            type="submit" 
            className="signup-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Create Account</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            )}
          </button>
        </form>

        <div className="signup-footer">
          <p>Already have an account? <Link to="/login" className="link">Sign In</Link></p>
          <p><Link to="/" className="link">← Back to Home</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
