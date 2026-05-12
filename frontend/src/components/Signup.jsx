import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "doctor",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      const role = response.user.role;

      setTimeout(() => {
        switch (role) {
          case "doctor":
            navigate("/doctor-dashboard");
            break;
          case "admin":
            navigate("/admin-dashboard");
            break;
          default:
            navigate("/login");
        }
      }, 1500);
    } catch (err) {
      setError(err.message || "Unable to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 font-sans"
      style={{ background: "linear-gradient(135deg, #c7d2fe 0%, #a5b4fc 40%, #818cf8 100%)" }}
    >
      {/* Card Container */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex min-h-150">

        {/* ── LEFT PANEL ── */}
        <div
          className="hidden md:flex md:w-5/12 flex-col justify-between p-10 relative overflow-hidden"
          style={{ background: "linear-gradient(160deg, #c7d2fe 0%, #a5b4fc 50%, #818cf8 100%)" }}
        >
          {/* Decorative blobs */}
          <div className="absolute -top-15 -left-15 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-indigo-700/20 rounded-full blur-2xl" />

          {/* Logo + brand */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/25 backdrop-blur rounded-xl flex items-center justify-center shadow-lg">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="2" width="6" height="8" rx="3" fill="white"/>
                <path d="M5 10h14v2a7 7 0 01-14 0v-2z" fill="white" opacity="0.85"/>
                <rect x="11" y="19" width="2" height="3" fill="white"/>
                <rect x="8" y="21" width="8" height="2" rx="1" fill="white"/>
              </svg>
            </div>
            <span className="text-white font-black text-xl tracking-tight">DocTracker</span>
          </div>

          {/* Middle content */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* 3-D stethoscope illustration */}
            <div className="relative">
              {/* Platform shadow */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-44 h-10 rounded-full"
                style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.35) 0%, transparent 70%)" }}
              />
              {/* Platform disc */}
              <div
                className="w-40 h-10 rounded-[50%] mx-auto mb-0"
                style={{
                  background: "linear-gradient(180deg, #c7d2fe 0%, #818cf8 100%)",
                  boxShadow: "0 8px 32px rgba(99,102,241,0.4)"
                }}
              />
              {/* SVG stethoscope */}
              <svg
                className="absolute bottom-4 left-1/2 -translate-x-1/2"
                width="130"
                height="145"
                viewBox="0 0 130 145"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Ear tubes */}
                <path d="M32 10 C32 10 28 28 28 44" stroke="#2d3a6e" strokeWidth="7" strokeLinecap="round"/>
                <path d="M98 10 C98 10 102 28 102 44" stroke="#2d3a6e" strokeWidth="7" strokeLinecap="round"/>
                {/* Head bridge */}
                <path d="M32 10 Q65 -4 98 10" stroke="#2d3a6e" strokeWidth="7" strokeLinecap="round" fill="none"/>
                {/* Ear tips */}
                <circle cx="32" cy="10" r="5" fill="#4f5fa3"/>
                <circle cx="98" cy="10" r="5" fill="#4f5fa3"/>
                {/* Tube down */}
                <path d="M28 44 Q14 80 26 108 Q38 130 65 132 Q92 130 104 108 Q116 80 102 44" stroke="#2d3a6e" strokeWidth="7" strokeLinecap="round" fill="none"/>
                {/* Chest piece body */}
                <circle cx="65" cy="128" r="17" fill="#2d3a6e"/>
                <circle cx="65" cy="128" r="12" fill="#3b4fcf"/>
                <circle cx="65" cy="128" r="7" fill="#818cf8"/>
                <circle cx="62" cy="125" r="2.5" fill="white" opacity="0.6"/>
              </svg>
            </div>

            <p className="text-white/90 text-center text-base font-medium leading-relaxed max-w-[200px]" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
              We always fully focused on helping your child.
            </p>
          </div>

          {/* Bottom dots */}
          <div className="relative z-10 flex gap-2 justify-center">
            <span className="w-6 h-2 bg-white rounded-full opacity-80"/>
            <span className="w-2 h-2 bg-white/50 rounded-full"/>
            <span className="w-2 h-2 bg-white/50 rounded-full"/>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="flex-1 flex flex-col justify-center px-8 py-10 md:px-12">
          {/* Language pill */}
          <div className="flex justify-end mb-6">
            <button className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold border border-slate-200 rounded-full px-3 py-1.5 hover:border-slate-300 transition-colors">
              🌐 English (US)
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
          </div>

          <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-6">
            Create Account
          </h2>

          {/* Social buttons */}
          <div className="flex gap-3 mb-5">
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 border border-slate-200 rounded-xl py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98]"
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.2 0 5.9 1.1 8.1 2.9l6-6C34.5 3.1 29.6 1 24 1 14.8 1 7 6.7 3.7 14.6l7 5.4C12.4 14 17.7 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.4c-.5 2.8-2.1 5.2-4.5 6.8l7 5.4c4.1-3.8 6.5-9.4 6.5-16.2z"/>
                <path fill="#FBBC05" d="M10.7 28.6A14.6 14.6 0 019.5 24c0-1.6.3-3.2.8-4.6l-7-5.4A23.1 23.1 0 001 24c0 3.8.9 7.4 2.5 10.5l7.2-5.9z"/>
                <path fill="#34A853" d="M24 47c6.5 0 11.9-2.1 15.9-5.8l-7-5.4c-2.2 1.5-5 2.3-8.9 2.3-6.3 0-11.6-4.3-13.5-10l-7.2 5.9C7 42.3 15 47 24 47z"/>
              </svg>
              Sign up with Google
            </button>
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 border border-slate-200 rounded-xl py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98]"
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#1877F2" d="M48 24C48 10.7 37.3 0 24 0S0 10.7 0 24c0 12 8.8 21.9 20.2 23.7V31h-6v-7h6v-5.3c0-6 3.6-9.3 9-9.3 2.6 0 5.4.5 5.4.5V16h-3c-3 0-3.9 1.9-3.9 3.8V24h6.7l-1.1 7H27.6v16.7C39.2 45.9 48 36 48 24z"/>
                <path fill="white" d="M33.3 31l1.1-7h-6.7v-4.2c0-1.9.9-3.8 3.9-3.8h3v-6s-2.7-.5-5.4-.5c-5.5 0-9 3.3-9 9.3V24h-6v7h6v16.7c1.2.2 2.5.3 3.8.3s2.6-.1 3.8-.3V31h5.5z"/>
              </svg>
              Sign up with Facebook
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-slate-200"/>
            <span className="text-xs font-bold text-slate-400 tracking-widest">— OR —</span>
            <div className="flex-1 h-px bg-slate-200"/>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Role */}
            <div className="relative">
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-10 text-sm text-slate-700 font-medium bg-white appearance-none focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all"
              >
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name:"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border-b border-slate-200 px-1 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-400 transition-colors bg-transparent"
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email:"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border-b border-slate-200 px-1 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-400 transition-colors bg-transparent"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password:"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border-b border-slate-200 px-1 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-400 transition-colors bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password:"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full border-b border-slate-200 px-1 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-400 transition-colors bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showConfirmPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-xl border border-red-100 text-xs font-bold">
                <span>⚠️</span> {error}
              </div>
            )}

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl text-white text-sm font-bold tracking-wide shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)" }}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>

          {/* Footer */}
          <p className="mt-5 text-center text-xs text-slate-500 font-medium">
            Already have an Account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors"
            >
              Log in
            </Link>
          </p>

          <div className="mt-3 text-center">
            <Link
              to="/"
              className="text-xs text-slate-400 hover:text-slate-500 transition-colors font-medium"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;