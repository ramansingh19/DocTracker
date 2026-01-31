import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService, {
  clearSession,
  getStoredUser,
} from "../services/authService";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "doctor",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedRole = localStorage.getItem("savedRole");
    const rememberMe = localStorage.getItem("rememberMe") === "true";

    if (rememberMe && savedEmail) {
      setFormData((prev) => ({
        ...prev,
        email: savedEmail,
        role: savedRole || "doctor",
        rememberMe: true,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { user } = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      if (user.role !== formData.role) {
        setError(
          `Your account is registered as ${user.role}. Please switch the role selector.`,
        );
        clearSession();
        setLoading(false);
        return;
      }

      if (formData.rememberMe) {
        localStorage.setItem("savedEmail", formData.email);
        localStorage.setItem("savedRole", user.role);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("savedEmail");
        localStorage.removeItem("savedRole");
        localStorage.removeItem("rememberMe");
      }

      switch (user.role) {
        case "doctor":
          navigate("/doctor-dashboard");
          break;
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "patient":
          navigate("/patient-status");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      const storedUser = getStoredUser();
      if (!storedUser) {
        clearSession();
      }
      setError(err.message || "Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Sophisticated Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 w-full max-w-[480px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] relative z-10 border border-white/20">
        {/* Header Section */}
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
            Welcome Back
          </h2>
          <p className="text-slate-500 font-medium">
            Secure access to your health dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role Picker */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
              Identity
            </label>
            <div className="relative">
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border-2 border-slate-100 px-5 py-4 rounded-2xl text-slate-900 font-bold appearance-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all outline-none cursor-pointer"
              >
                <option value="doctor">Doctor / Healthcare Provider</option>
                <option value="admin">System Administrator</option>
                <option value="patient">Patient Portal</option>
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

          {/* Credentials */}
          <div className="space-y-4">
            {[
              {
                label: "Email Address",
                name: "email",
                type: "email",
                placeholder: "name@hospital.com",
              },
              {
                label: "Password",
                name: "password",
                type: "password",
                placeholder: "••••••••",
              },
            ].map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border-2 border-slate-100 px-5 py-4 rounded-2xl focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all outline-none font-medium text-slate-900"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-5 h-5 accent-teal-600 rounded-lg border-2 border-slate-200"
              />
              <span className="text-sm font-bold text-slate-600 group-hover:text-teal-600 transition-colors">
                Remember me
              </span>
            </label>
            <a
              href="#"
              className="text-sm font-bold text-teal-600 hover:text-teal-700"
            >
              Forgot?
            </a>
          </div>

          {error && (
            <div className="flex items-center gap-3 bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 text-sm font-bold animate-shake">
              <span>⚠️</span> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-teal-600/20 transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {loading ? (
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              "Enter Dashboard"
            )}
          </button>
        </form>

        {/* Demo Accounts - Minimalist Table Style */}
        <div className="mt-10 p-6 bg-slate-50 rounded-3xl border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
              System Sandbox
            </span>
            <div className="h-px flex-1 bg-slate-200"></div>
          </div>
          <div className="space-y-3">
            {[
              {
                role: "Doctor",
                color: "bg-blue-500",
                email: "doctor@example.com",
              },
              {
                role: "Admin",
                color: "bg-amber-500",
                email: "admin@example.com",
              },
              {
                role: "Patient",
                color: "bg-emerald-500",
                email: "patient@example.com",
              },
            ].map((demo) => (
              <div
                key={demo.role}
                className="flex items-center justify-between group cursor-help"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${demo.color}`}
                  ></div>
                  <span className="text-xs font-bold text-slate-600">
                    {demo.role}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 group-hover:text-teal-600 transition-colors">
                  {demo.email}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col items-center gap-4">
          <p className="text-slate-500 font-medium">
            New to the platform?{" "}
            <Link
              to="/signup"
              className="text-teal-600 font-bold hover:text-teal-700 underline decoration-teal-500/20 underline-offset-4"
            >
              Create Account
            </Link>
          </p>
          <Link
            to="/"
            className="text-xs font-black uppercase tracking-tighter text-slate-400 hover:text-slate-600 transition-colors"
          >
            ← Exit Portal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
