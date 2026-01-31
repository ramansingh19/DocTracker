import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    <div className="min-h-screen bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 w-full max-w-[420px] shadow-xl border border-slate-200/50">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg sm:w-10 sm:h-10">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
                <path d="M12 18L13.09 14.26L20 13L13.09 12.74L12 6L10.91 12.74L4 13L10.91 14.26L12 18Z" fill="currentColor"/>
              </svg>
            </div>
            <h2 className="text-gray-900 text-3xl font-extrabold m-0 md:text-[1.75rem] sm:text-2xl">Create Account</h2>
          </div>
          <p className="text-slate-500 text-base m-0 sm:text-sm">Join DocTracker and start transforming healthcare</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <label htmlFor="role" className="font-semibold text-gray-700 text-[0.95rem]">Register as</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="px-5 py-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 bg-white text-gray-900 focus:outline-none focus:border-teal-500 focus:shadow-[0_0_0_4px_rgba(102,126,234,0.1)] focus:-translate-y-0.5 placeholder:text-gray-400 sm:text-base sm:px-4 sm:py-3.5"
            >
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
              <option value="patient">Patient</option>
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="name" className="font-semibold text-gray-700 text-[0.95rem]">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="px-5 py-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 bg-white text-gray-900 focus:outline-none focus:border-teal-500 focus:shadow-[0_0_0_4px_rgba(102,126,234,0.1)] focus:-translate-y-0.5 placeholder:text-gray-400 sm:text-base sm:px-4 sm:py-3.5"
              autoComplete="name"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="email" className="font-semibold text-gray-700 text-[0.95rem]">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="px-5 py-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 bg-white text-gray-900 focus:outline-none focus:border-teal-500 focus:shadow-[0_0_0_4px_rgba(102,126,234,0.1)] focus:-translate-y-0.5 placeholder:text-gray-400 sm:text-base sm:px-4 sm:py-3.5"
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="password" className="font-semibold text-gray-700 text-[0.95rem]">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a strong password"
              minLength="8"
              className="px-5 py-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 bg-white text-gray-900 focus:outline-none focus:border-teal-500 focus:shadow-[0_0_0_4px_rgba(102,126,234,0.1)] focus:-translate-y-0.5 placeholder:text-gray-400 sm:text-base sm:px-4 sm:py-3.5"
              autoComplete="new-password"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="confirmPassword" className="font-semibold text-gray-700 text-[0.95rem]">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
              className="px-5 py-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 bg-white text-gray-900 focus:outline-none focus:border-teal-500 focus:shadow-[0_0_0_4px_rgba(102,126,234,0.1)] focus:-translate-y-0.5 placeholder:text-gray-400 sm:text-base sm:px-4 sm:py-3.5"
              autoComplete="new-password"
            />
          </div>

          {error && (
            <div className="bg-gradient-to-br from-red-100 to-red-200 text-red-600 px-5 py-4 rounded-xl border border-red-300 text-center font-medium text-[0.95rem]">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-700 px-5 py-4 rounded-xl border border-emerald-300 text-center font-medium text-[0.95rem]">
              {success}
            </div>
          )}

          <button 
            type="submit" 
            className="bg-teal-600 text-white border-0 px-8 py-4 rounded-xl text-lg font-semibold cursor-pointer transition-all duration-300 mt-4 flex items-center justify-center gap-2 hover:bg-teal-700 disabled:opacity-70 disabled:cursor-not-allowed sm:px-6 sm:py-3.5 sm:text-base sm:w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
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

        <div className="text-center mt-8 pt-8 border-t border-gray-200 sm:mt-6 sm:pt-6">
          <p className="my-3 text-slate-500 text-[0.95rem] sm:text-sm">Already have an account? <Link to="/login" className="text-teal-600 no-underline font-semibold transition-colors duration-300 hover:text-teal-700">Sign In</Link></p>
          <p className="my-3 text-slate-500 text-[0.95rem] sm:text-sm"><Link to="/" className="text-teal-600 no-underline font-semibold transition-colors duration-300 hover:text-teal-700">← Back to Home</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
