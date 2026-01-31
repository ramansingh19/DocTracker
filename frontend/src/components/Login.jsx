import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
            <h2 className="text-gray-900 text-3xl font-extrabold m-0 md:text-[1.75rem] sm:text-2xl">Welcome Back</h2>
          </div>
          <p className="text-slate-500 text-base m-0 sm:text-sm">Sign in to your DocTracker account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <label htmlFor="role" className="font-semibold text-gray-700 text-[0.95rem]">Login as</label>
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
              placeholder="Enter your password"
              className="px-5 py-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 bg-white text-gray-900 focus:outline-none focus:border-teal-500 focus:shadow-[0_0_0_4px_rgba(102,126,234,0.1)] focus:-translate-y-0.5 placeholder:text-gray-400 sm:text-base sm:px-4 sm:py-3.5"
              autoComplete="current-password"
            />
          </div>

          <div className="flex flex-col gap-3 mb-4">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 select-none hover:[&>span]:text-teal-600">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-[18px] h-[18px] accent-teal-500 cursor-pointer"
              />
              <span className="font-medium">Remember me</span>
            </label>
          </div>

          {error && (
            <div className="bg-gradient-to-br from-red-100 to-red-200 text-red-600 px-5 py-4 rounded-xl border border-red-300 text-center font-medium text-[0.95rem]">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="bg-teal-600 hover:bg-teal-700 text-white border-0 px-8 py-4 rounded-xl text-lg font-semibold cursor-pointer transition-all duration-300 mt-4 flex items-center justify-center gap-2 shadow-[0_8px_25px_rgba(102,126,234,0.3)] relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(102,126,234,0.4)] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none sm:px-6 sm:py-3.5 sm:text-base sm:w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
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

        <div className="text-center mt-8 pt-8 border-t border-gray-200 sm:mt-6 sm:pt-6">
          <p className="my-3 text-slate-500 text-[0.95rem] sm:text-sm">Don't have an account? <Link to="/signup" className="text-teal-600 no-underline font-semibold transition-colors duration-300 hover:text-teal-700">Create Account</Link></p>
          <p className="my-3 text-slate-500 text-[0.95rem] sm:text-sm"><Link to="/" className="text-teal-600 no-underline font-semibold transition-colors duration-300 hover:text-teal-700">← Back to Home</Link></p>
        </div>

        <div className="mt-8 p-6 bg-gradient-to-br from-slate-50 to-slate-200 rounded-2xl border border-gray-200 sm:p-5 sm:mt-6">
          <h4 className="m-0 mb-4 text-gray-700 text-base font-semibold">Demo Credentials:</h4>
          <div className="flex items-center gap-3 my-3 text-sm md:flex-col md:items-start md:gap-2 md:text-xs">
            <span className="px-3 py-1 rounded-2xl text-xs font-semibold uppercase tracking-wide min-w-[60px] text-center bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800 md:self-start">Doctor</span>
            <span className="text-slate-500 font-mono">doctor@example.com / password123</span>
          </div>
          <div className="flex items-center gap-3 my-3 text-sm md:flex-col md:items-start md:gap-2 md:text-xs">
            <span className="px-3 py-1 rounded-2xl text-xs font-semibold uppercase tracking-wide min-w-[60px] text-center bg-gradient-to-br from-amber-100 to-amber-200 text-amber-800 md:self-start">Admin</span>
            <span className="text-slate-500 font-mono">admin@example.com / password123</span>
          </div>
          <div className="flex items-center gap-3 my-3 text-sm md:flex-col md:items-start md:gap-2 md:text-xs">
            <span className="px-3 py-1 rounded-2xl text-xs font-semibold uppercase tracking-wide min-w-[60px] text-center bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-800 md:self-start">Patient</span>
            <span className="text-slate-500 font-mono">patient@example.com / password123</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
