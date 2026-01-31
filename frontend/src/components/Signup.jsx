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
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

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
      await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      setSuccess("Account created successfully! Redirecting...");

      setTimeout(() => {
        switch (formData.role) {
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
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Modern background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 w-full max-w-[480px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] relative z-10 border border-white/20">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl mb-6 shadow-xl shadow-teal-500/20 rotate-3 hover:rotate-0 transition-transform duration-300">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white"
            >
              <path
                d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                fill="currentColor"
              />
              <path
                d="M12 18L13.09 14.26L20 13L13.09 12.74L12 6L10.91 12.74L4 13L10.91 14.26L12 18Z"
                fill="currentColor"
                opacity="0.5"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
            Create Account
          </h2>
          <p className="text-slate-500 font-medium">
            Join the next generation of healthcare.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role Selection - Pill Style */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
              Register as
            </label>
            <div className="relative group">
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border-2 border-slate-100 px-5 py-4 rounded-2xl text-slate-900 font-semibold appearance-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all outline-none cursor-pointer"
              >
                <option value="doctor">Healthcare Provider (Doctor)</option>
                <option value="admin">System Administrator</option>
                <option value="patient">Patient / Client</option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            {[
              {
                label: "Full Name",
                name: "name",
                type: "text",
                placeholder: "e.g. Dr. Sarah Chen",
                icon: "👤",
              },
              {
                label: "Email Address",
                name: "email",
                type: "email",
                placeholder: "name@hospital.com",
                icon: "✉️",
              },
              {
                label: "Password",
                name: "password",
                type: "password",
                placeholder: "••••••••",
                icon: "🔒",
              },
            ].map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                  {field.label}
                </label>
                <div className="relative">
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border-2 border-slate-100 px-5 py-4 rounded-2xl focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all outline-none font-medium"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Error/Success States */}
          {error && (
            <div className="flex items-center gap-3 bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 text-sm font-bold animate-shake">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-teal-600/20 transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {loading ? (
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Get Started</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col items-center gap-4">
          <p className="text-slate-500 font-medium">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-teal-600 font-bold hover:text-teal-700 underline decoration-teal-500/20 underline-offset-4"
            >
              Sign In
            </Link>
          </p>
          <Link
            to="/"
            className="text-xs font-black uppercase tracking-tighter text-slate-400 hover:text-slate-600 transition-colors"
          >
            ← Back to corporate site
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
