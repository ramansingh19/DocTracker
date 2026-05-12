import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService, {
  clearSession,
  getStoredUser,
} from "../services/authService";

/* ─── Decorative SVG pieces for the right panel ─── */

const BlobLayer = ({ d, fill, opacity = 1 }) => (
  <path d={d} fill={fill} opacity={opacity} />
);

const StethoscopeIllustration = () => (
  <svg
    viewBox="0 0 220 260"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-52 h-64 drop-shadow-2xl"
    style={{ filter: "drop-shadow(0 0 24px rgba(255,255,255,0.15))" }}
  >
    {/* Ear tips */}
    <circle cx="60" cy="30" r="10" stroke="white" strokeWidth="6" />
    <circle cx="160" cy="30" r="10" stroke="white" strokeWidth="6" />
    {/* Tubes going down */}
    <path
      d="M60 40 C60 100 110 110 110 150"
      stroke="white"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <path
      d="M160 40 C160 100 110 110 110 150"
      stroke="white"
      strokeWidth="6"
      strokeLinecap="round"
    />
    {/* Tube going to chest piece */}
    <path
      d="M110 150 C110 190 130 210 130 230"
      stroke="white"
      strokeWidth="6"
      strokeLinecap="round"
    />
    {/* Chest piece circle */}
    <circle cx="130" cy="240" r="18" stroke="white" strokeWidth="6" />
    <circle cx="130" cy="240" r="6" fill="white" opacity="0.6" />
  </svg>
);

const GeometricHeart = () => (
  <svg
    viewBox="0 0 120 110"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-28 h-28"
    style={{
      filter: "drop-shadow(0 0 20px rgba(56,189,248,0.6))",
      animation: "float 3.5s ease-in-out infinite",
    }}
  >
    <defs>
      <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
    </defs>
    {/* Heart shape */}
    <path
      d="M60 95 C60 95 10 60 10 30 C10 15 22 5 35 5 C45 5 55 12 60 20 C65 12 75 5 85 5 C98 5 110 15 110 30 C110 60 60 95 60 95Z"
      fill="url(#heartGrad)"
      opacity="0.9"
    />
    {/* Inner geometric lines */}
    <line x1="60" y1="20" x2="40" y2="50" stroke="white" strokeWidth="1" opacity="0.5" />
    <line x1="60" y1="20" x2="80" y2="50" stroke="white" strokeWidth="1" opacity="0.5" />
    <line x1="40" y1="50" x2="80" y2="50" stroke="white" strokeWidth="1" opacity="0.5" />
    <line x1="40" y1="50" x2="60" y2="80" stroke="white" strokeWidth="1" opacity="0.5" />
    <line x1="80" y1="50" x2="60" y2="80" stroke="white" strokeWidth="1" opacity="0.5" />
    <line x1="60" y1="20" x2="60" y2="80" stroke="white" strokeWidth="1" opacity="0.3" />
    {/* Corner dots */}
    <circle cx="60" cy="20" r="3" fill="white" opacity="0.9" />
    <circle cx="40" cy="50" r="2.5" fill="white" opacity="0.7" />
    <circle cx="80" cy="50" r="2.5" fill="white" opacity="0.7" />
    <circle cx="60" cy="80" r="3" fill="white" opacity="0.9" />
  </svg>
);

const LeafTopRight = () => (
  <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-28">
    <path d="M60 130 C60 130 5 80 10 30 C12 10 30 0 50 5 C75 12 95 40 90 80 C85 110 60 130 60 130Z" fill="#1e3a6e" opacity="0.8" />
    <path d="M60 130 C60 130 5 80 10 30" stroke="#2a4f8a" strokeWidth="1.5" opacity="0.5" />
    <path d="M60 130 C75 100 85 70 90 80" stroke="#2a4f8a" strokeWidth="1.5" opacity="0.5" />
    <line x1="60" y1="130" x2="50" y2="5" stroke="#2a4f8a" strokeWidth="1" opacity="0.4" />
  </svg>
);

const LeafBottomLeft = () => (
  <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-24">
    <path d="M50 110 C50 110 5 65 8 25 C10 8 25 0 42 4 C65 10 80 38 75 68 C70 92 50 110 50 110Z" fill="#162850" opacity="0.9" />
    <line x1="50" y1="110" x2="42" y2="4" stroke="#1e3468" strokeWidth="1" opacity="0.4" />
  </svg>
);

/* Small floating medical icon dots for the background grid */
const IconGrid = () => {
  const icons = ["⚕", "+", "♡", "⊕", "✦", "○", "◇", "⊗", "⊞", "⊟"];
  const positions = [
    { top: "8%", left: "10%" }, { top: "12%", left: "55%" }, { top: "18%", left: "80%" },
    { top: "30%", left: "20%" }, { top: "35%", left: "70%" }, { top: "50%", left: "10%" },
    { top: "55%", left: "85%" }, { top: "68%", left: "35%" }, { top: "72%", left: "65%" },
    { top: "85%", left: "15%" }, { top: "88%", left: "75%" }, { top: "92%", left: "45%" },
  ];
  return (
    <>
      {positions.map((pos, i) => (
        <span
          key={i}
          className="absolute text-white/[0.08] text-lg select-none pointer-events-none"
          style={{ top: pos.top, left: pos.left }}
        >
          {icons[i % icons.length]}
        </span>
      ))}
    </>
  );
};

/* ─── Main Component ─── */
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
    <>
      {/* Global float animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(3deg); }
        }
        .animate-float { animation: float 3.5s ease-in-out infinite; }
        .animate-float-slow { animation: floatSlow 5s ease-in-out infinite; }
        .input-field {
          width: 100%;
          background: #ffffff;
          border: 1.5px solid #e2e0ee;
          border-radius: 12px;
          padding: 13px 18px;
          font-size: 14px;
          color: #1e1b4b;
          font-weight: 500;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input-field::placeholder { color: #a0a0b8; font-weight: 400; }
        .input-field:focus {
          border-color: #7c6fcd;
          box-shadow: 0 0 0 3px rgba(124, 111, 205, 0.15);
        }
        .select-field {
          width: 100%;
          background: #ffffff;
          border: 1.5px solid #e2e0ee;
          border-radius: 12px;
          padding: 13px 40px 13px 18px;
          font-size: 14px;
          color: #1e1b4b;
          font-weight: 600;
          outline: none;
          appearance: none;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .select-field:focus {
          border-color: #7c6fcd;
          box-shadow: 0 0 0 3px rgba(124, 111, 205, 0.15);
        }
      `}</style>

      <div className="min-h-screen bg-[#e8e6f0] flex items-center justify-center p-4 lg:p-8 font-sans">
        {/* Card Container */}
        <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.35)] flex flex-col lg:flex-row min-h-[600px]">

          {/* ── LEFT PANEL: Form ── */}
          <div className="w-full lg:w-[42%] bg-gradient-to-br from-[#f4f2fb] to-[#ebe7f6] flex flex-col justify-center px-8 py-10 md:px-12 relative">

            {/* Branding */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#7c6fcd] to-[#5b4fa8]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3C12 3 4 7 4 13C4 17.4183 7.58172 21 12 21C16.4183 21 20 17.4183 20 13C20 7 12 3 12 3Z" fill="white" opacity="0.9"/>
                  <path d="M12 8V16M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-xl font-black text-[#1e1b4b] tracking-tight">DocTracker</span>
              <div className="w-px h-6 bg-[#c4bfe8] mx-1" />
              <span className="text-sm text-[#8880b0] font-medium leading-tight">
                Healthcare<br />Portal
              </span>
            </div>

            {/* Welcome Text */}
            <div className="mb-7">
              <h1 className="text-2xl font-black text-[#1e1b4b] mb-1">Welcome back 👋</h1>
              <p className="text-sm text-[#8880b0] font-medium">Sign in to access your dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Role Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-[#8880b0]">
                  Role
                </label>
                <div className="relative">
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="select-field"
                  >
                    <option value="doctor">Doctor / Healthcare Provider</option>
                    <option value="admin">System Administrator</option>
                    <option value="patient">Patient Portal</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#8880b0]">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-[#8880b0]">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@hospital.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-[#8880b0]">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>

              {/* Remember Me + Forgot */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 accent-[#7c6fcd] rounded border-[#c4bfe8]"
                  />
                  <span className="text-xs font-semibold text-[#8880b0] group-hover:text-[#7c6fcd] transition-colors">
                    Remember me
                  </span>
                </label>
                <a href="#" className="text-xs font-bold text-[#7c6fcd] hover:text-[#5b4fa8] transition-colors">
                  Forgot password?
                </a>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-xl border border-red-100 text-xs font-semibold">
                  <span>⚠️</span> {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#e8395a] hover:bg-[#c7304e] active:scale-[0.98] text-white py-3.5 rounded-full font-bold text-sm tracking-wide shadow-lg shadow-[#e8395a]/30 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Signup + Exit */}
            <div className="mt-6 flex flex-col items-center gap-2">
              <p className="text-xs text-[#8880b0]">
                New here?{" "}
                <Link to="/signup" className="font-bold text-[#7c6fcd] hover:text-[#5b4fa8] underline underline-offset-2">
                  Create Account
                </Link>
              </p>
              <Link
                to="/"
                className="text-[11px] font-black uppercase tracking-widest text-[#b0aace] hover:text-[#7c6fcd] transition-colors mt-1"
              >
                ← Back to Home
              </Link>
            </div>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/80">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#b0aace]">
                  Sandbox Accounts
                </span>
                <div className="h-px flex-1 bg-[#e2e0ee]" />
              </div>
              <div className="space-y-2">
                {[
                  { role: "Doctor", color: "bg-blue-400", email: "doctor@example.com" },
                  { role: "Admin", color: "bg-amber-400", email: "admin@example.com" },
                  { role: "Patient", color: "bg-emerald-400", email: "patient@example.com" },
                ].map((demo) => (
                  <div key={demo.role} className="flex items-center justify-between group cursor-help">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${demo.color}`} />
                      <span className="text-[11px] font-bold text-[#6b6b80]">{demo.role}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#b0aace] group-hover:text-[#7c6fcd] transition-colors">
                      {demo.email}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL: Illustration ── */}
          <div className="hidden lg:flex lg:w-[58%] relative overflow-hidden bg-[#0a1628]">

            {/* Layered organic blob shapes */}
            <svg
              viewBox="0 0 600 700"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Back blob */}
              <path
                d="M-50 0 C80 20 150 100 120 220 C90 340 -20 380 30 500 C80 620 200 680 300 700 L600 700 L600 0 Z"
                fill="#0d1f45"
              />
              {/* Mid blob */}
              <path
                d="M-30 50 C60 80 110 180 90 290 C70 400 -10 430 40 540 C90 650 190 690 260 700 L500 700 L500 0 L-30 0 Z"
                fill="#0f2550"
                opacity="0.7"
              />
              {/* Front silhouette */}
              <path
                d="M20 0 C80 30 160 120 130 250 C110 340 40 400 70 510 C100 610 200 670 240 700 L360 700 L380 0 Z"
                fill="#162c5e"
                opacity="0.6"
              />
              {/* Innermost accent */}
              <path
                d="M60 0 C120 60 180 150 150 280 C130 370 70 420 100 530 C130 630 220 680 250 700 L300 700 L320 0 Z"
                fill="#1a3468"
                opacity="0.5"
              />
            </svg>

            {/* Background icon grid */}
            <div className="absolute inset-0">
              <IconGrid />
            </div>

            {/* Decorative leaves top-right */}
            <div className="absolute top-0 right-4 opacity-70 animate-float-slow">
              <LeafTopRight />
            </div>
            {/* Extra leaf top-right */}
            <div className="absolute top-8 right-20 opacity-40">
              <LeafTopRight />
            </div>

            {/* Decorative leaf bottom */}
            <div className="absolute bottom-0 left-10 opacity-60 animate-float-slow" style={{ animationDelay: "1s" }}>
              <LeafBottomLeft />
            </div>
            <div className="absolute bottom-4 right-16 opacity-40" style={{ animationDelay: "2s" }}>
              <LeafBottomLeft />
            </div>

            {/* Glowing geometric heart — center-left of right panel */}
            <div
              className="absolute"
              style={{
                left: "14%",
                top: "42%",
                transform: "translateY(-50%)",
              }}
            >
              <div className="animate-float">
                <GeometricHeart />
              </div>
            </div>

            {/* Stethoscope — center-right */}
            <div
              className="absolute"
              style={{
                right: "12%",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <div className="animate-float" style={{ animationDelay: "0.8s" }}>
                <StethoscopeIllustration />
              </div>
            </div>

            {/* Subtle radial glow behind heart */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: "0%",
                top: "35%",
                width: "220px",
                height: "220px",
                background: "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)",
                borderRadius: "50%",
              }}
            />

            {/* Bottom accent text */}
            <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-1">
              <div className="flex items-center gap-2">
                <div className="w-6 h-px bg-white/20" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                  DocTracker · Healthcare Portal
                </span>
                <div className="w-6 h-px bg-white/20" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Login;
