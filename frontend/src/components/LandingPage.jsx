import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import IndustryFeatures from "./IndustryFeatures";
import ContactPage from "./Contactpage";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);

  // Close menu when clicking outside or on a link
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="font-sans bg-white text-gray-900 leading-relaxed overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0  backdrop-blur-xl border-b border-slate-200/60 z-[1000] py-3 sm:py-4 shadow-sm">
        <div
          ref={navRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative"
        >
          {/* Logo */}
          <div className="flex items-center gap-3 text-9xl font-bold text-gray-900 sm:text-xl">
            <div
              className="w-10 h-10 sm:w-[45px] sm:h-[35px] 
        bg-gradient-to-br from-indigo-500 to-purple-600 
        rounded-xl flex items-center justify-center text-white 
        transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              <img
                src="https://i.pinimg.com/736x/3b/df/57/3bdf5702d98a357455ff4027786c3d96.jpg"
                alt="DocTracker Logo"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <span className="bg-gradient-to-br from-indigo-500 to-purple-600 bg-clip-text text-transparent tracking-tight">
              DocTracker
            </span>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`flex flex-col justify-between w-[32px] h-[24px] bg-transparent border-0 cursor-pointer p-0 z-[1001] relative md:flex lg:hidden`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span
              className={`h-[3px] w-full bg-gray-900 rounded transition-all duration-300
        ${isMenuOpen ? "rotate-45 translate-y-[10px]" : ""}`}
            ></span>

            <span
              className={`h-[3px] w-full bg-gray-900 rounded transition-all duration-300
        ${isMenuOpen ? "opacity-0" : ""}`}
            ></span>

            <span
              className={`h-[3px] w-full bg-gray-900 rounded transition-all duration-300
        ${isMenuOpen ? "-rotate-45 -translate-y-[10px]" : ""}`}
            ></span>
          </button>

          {/* Menu */}
          <div
            className={`flex items-center gap-10 lg:gap-6
      md:fixed md:top-[70px] md:left-0 md:right-0
      md:bg-white/95 md:backdrop-blur-xl
      md:flex-col md:items-start md:p-8 md:gap-6
      md:shadow-xl md:border-b md:border-black/5
      md:transition-all md:duration-300 md:z-[999]
      ${
        isMenuOpen
          ? "md:translate-y-0 md:opacity-100 md:visible"
          : "md:-translate-y-full md:opacity-0 md:invisible"
      }`}
          >
            {/* Link */}
            <a
              href="#features"
              onClick={() => setIsMenuOpen(false)}
              className="relative text-slate-600 font-medium text-[0.95rem]
        transition-all duration-300 hover:text-indigo-500
        after:absolute after:left-0 after:-bottom-1
        after:w-0 after:h-[2px] after:bg-indigo-500
        after:transition-all after:duration-300 hover:after:w-full
        md:text-[1.1rem] md:py-3 md:w-full md:border-b md:border-black/5"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              onClick={() => setIsMenuOpen(false)}
              className="relative text-slate-600 font-medium text-[0.95rem]
        transition-all duration-300 hover:text-indigo-500
        after:absolute after:left-0 after:-bottom-1
        after:w-0 after:h-[2px] after:bg-indigo-500
        after:transition-all after:duration-300 hover:after:w-full
        md:text-[1.1rem] md:py-3 md:w-full md:border-b md:border-black/5"
            >
              How It Works
            </a>

            <a
              href="#ContactPage"
              onClick={() => setIsMenuOpen(false)}
              className="relative text-slate-600 font-medium text-[0.95rem]
        transition-all duration-300 hover:text-indigo-500
        after:absolute after:left-0 after:-bottom-1
        after:w-0 after:h-[2px] after:bg-indigo-500
        after:transition-all after:duration-300 hover:after:w-full
        md:text-[1.1rem] md:py-3 md:w-full md:border-b md:border-black/5"
            >
              Contact
            </a>

            {/* CTA */}
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="bg-gradient-to-br from-indigo-500 to-purple-600
        text-white px-7 py-3 rounded-xl font-semibold text-[0.95rem]
        transition-all duration-300
        shadow-lg hover:shadow-indigo-300/40
        hover:-translate-y-0.5 active:scale-95
        md:w-full md:text-center"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* main-page */}
      <section className="pt-28 sm:pt-32 pb-20 sm:pb-24 relative overflow-hidden min-h-[90vh]">
        {/* ADD Background Image - PUT HERE */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(15,23,42,0.7)), 
                          url('https://i.pinimg.com/1200x/15/e9/56/15e95618a2a142e412902a71f1419cca.jpg')`,
            }}
          />
        </div>
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-40 left-1/2 w-60 h-60 bg-emerald-200/20 rounded-full blur-3xl animate-bounce"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          <div className="max-w-xl lg:max-w-none md:text-center lg:text-left space-y-8">
            <div className="inline-flex bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm text-indigo-600 px-6 py-3 rounded-2xl text-sm font-semibold mb-8 border border-indigo-500/20 shadow-lg">
              <span className="flex items-center gap-2">
                🏥 Healthcare Innovation
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-5xl font-black leading-[1.05] mb-8 text-gray-900 bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent drop-shadow-lg">
              Transform Your Hospital's
              <span className="block mt-2 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Patient Experience
              </span>
            </h1>

            <p className="text-xl font-bold md:text-1xl text-slate-900 mb-12 leading-relaxed max-w-lg">
              Revolutionize healthcare with real-time doctor tracking,
              AI-powered queue management, and seamless communication. Reduce
              wait times by up to{" "}
              <span className="font-bold text-indigo-600">60%</span> and boost
              satisfaction.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link
                to="/login"
                className="group inline-flex items-center gap-3 px-8 py-5 rounded-2xl font-bold text-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300 hover:from-indigo-600 hover:to-purple-700"
              >
                <span>Get Started</span>
                <svg
                  className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <a
                href="https://www.youtube.com/watch?v=8QyBBqlKkbQ"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-5 rounded-2xl font-bold text-lg border-2 border-slate-200 bg-white/80 backdrop-blur-sm text-slate-700 shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:border-indigo-500 hover:text-indigo-600 transform transition-all duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5V19L19 12L8 5Z" />
                </svg>
                <span>Watch Demo</span>
              </a>
            </div>

            {/* Enhanced Role Selection */}
            <div className="text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-10">
                Choose Your Role
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    to: "/doctor-landing",
                    icon: "👨‍⚕️",
                    title: "For Doctors",
                    desc: "Manage schedule & track patients",
                    color: "from-emerald-500 to-green-600",
                    bg: "bg-emerald-500/10",
                  },
                  {
                    to: "/patient-landing",
                    icon: "👤",
                    title: "For Patients",
                    desc: "Track queue & availability",
                    color: "from-blue-500 to-cyan-600",
                    bg: "bg-blue-500/10",
                  },
                  {
                    to: "/admin-landing",
                    icon: "👨‍💼",
                    title: "For Admins",
                    desc: "Manage operations & system",
                    color: "from-purple-500 to-pink-600",
                    bg: "bg-purple-500/10",
                  },
                ].map((role, i) => (
                  <Link
                    key={role.title}
                    to={role.to}
                    className={`group relative w-full p-8 bg-white/70 backdrop-blur-xl border-2 border-white/50 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-3 hover:border-${role.color.replace("from-", "").replace("to-", "")} transform transition-all duration-500 overflow-hidden ${role.bg}`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    ></div>
                    <div
                      className={`relative text-4xl w-20 h-20 flex items-center justify-center bg-gradient-to-br ${role.color} text-white rounded-2xl shadow-2xl mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto lg:mx-0`}
                    >
                      {role.icon}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      {role.title}
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      {role.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Enhanced Stats */}
            <div className="flex gap-8 flex-wrap md:justify-center lg:justify-start mt-12">
              {[
                { num: "500+", label: "Hospitals", color: "text-indigo-600" },
                {
                  num: "60%",
                  label: "Wait Reduction",
                  color: "text-emerald-600",
                },
                { num: "99.9%", label: "Uptime", color: "text-purple-600" },
              ].map((stat) => (
                <div key={stat.label} className="text-center group">
                  <span
                    className={`text-4xl lg:text-5xl font-black ${stat.color} leading-none block group-hover:scale-110 transition-transform duration-300`}
                  >
                    {stat.num}
                  </span>
                  <span className="text-sm text-slate-500 font-semibold mt-2 block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Dashboard Mockup */}
          <div className="flex justify-center items-start md:mt-12">
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden w-full max-w-md lg:max-w-lg transform hover:scale-[1.02] transition-all duration-500 border border-white/50">
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-50 to-indigo-50/50 px-6 py-5 flex items-center gap-3 border-b border-slate-200/50">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400 animate-pulse"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                </div>
                <div className="font-bold text-lg text-gray-800 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  DocTracker Dashboard
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Doctor Card 1 */}
                <div className="group bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl p-6 border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300 hover:shadow-xl">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-3xl shrink-0">👨‍⚕️</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-lg text-gray-900 truncate">
                        Dr. Sarah Johnson
                      </h4>
                      <p className="text-sm text-slate-500 truncate">
                        Cardiology •{" "}
                        <span className="font-semibold text-emerald-600">
                          Available
                        </span>
                      </p>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg flex-shrink-0 animate-pulse"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <span className="block text-2xl font-black text-indigo-600 group-hover:scale-110 transition-transform">
                        8
                      </span>
                      <span className="text-xs text-slate-500 font-medium block mt-1">
                        Patients Today
                      </span>
                    </div>
                    <div>
                      <span className="block text-2xl font-black text-indigo-600 group-hover:scale-110 transition-transform">
                        5min
                      </span>
                      <span className="text-xs text-slate-500 font-medium block mt-1">
                        Avg. Wait
                      </span>
                    </div>
                  </div>
                </div>

                {/* Doctor Card 2 */}
                <div className="group bg-gradient-to-br from-slate-50 to-indigo-50/30 rounded-2xl p-6 border-2 border-transparent hover:border-amber-400/50 transition-all duration-300 hover:shadow-xl">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-3xl shrink-0">👩‍⚕️</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-lg text-gray-900 truncate">
                        Dr. Michael Chen
                      </h4>
                      <p className="text-sm text-slate-500 truncate">
                        Orthopedics •{" "}
                        <span className="font-semibold text-amber-600">
                          In Transit
                        </span>
                      </p>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-amber-500 shadow-lg flex-shrink-0 animate-pulse"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <span className="block text-2xl font-black text-indigo-600 group-hover:scale-110 transition-transform">
                        12
                      </span>
                      <span className="text-xs text-slate-500 font-medium block mt-1">
                        Patients Today
                      </span>
                    </div>
                    <div>
                      <span className="block text-2xl font-black text-indigo-600 group-hover:scale-110 transition-transform">
                        15min
                      </span>
                      <span className="text-xs text-slate-500 font-medium block mt-1">
                        ETA
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="relative py-24 overflow-hidden bg-[#fafaff]"
      >
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-[128px] opacity-50"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest uppercase text-indigo-600 bg-indigo-50 rounded-full">
              Platform Excellence
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Powerful Features for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                Modern Healthcare
              </span>
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Everything you need to streamline operations and enhance patient
              care in one seamless ecosystem.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative bg-white border border-slate-100 p-8 rounded-[2.5rem] transition-all duration-500 hover:shadow-[0_40px_80px_-15px_rgba(79,70,229,0.15)] hover:-translate-y-3">
              <div className="relative z-10">
                <div className="w-16 h-16 mb-8 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                    <path d="M2 17L12 22L22 17" />
                    <path d="M2 12L12 17L22 12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Real-Time Tracking
                </h3>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  Monitor doctor locations and arrival times with GPS precision.
                  Patients get accurate ETAs automatically.
                </p>
                <div className="flex items-center text-sm font-bold text-indigo-600">
                  <span className="px-3 py-1 bg-indigo-50 rounded-lg">
                    ⚡ Live Updates
                  </span>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-white border border-slate-100 p-8 rounded-[2.5rem] transition-all duration-500 hover:shadow-[0_40px_80px_-15px_rgba(79,70,229,0.15)] hover:-translate-y-3">
              <div className="relative z-10">
                <div className="w-16 h-16 mb-8 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-white shadow-lg shadow-purple-200 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 11H15M9 15H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V19C19 20.1046 18.1046 21 17 21Z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Smart Queue
                </h3>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  Intelligent patient queuing with priority handling, virtual
                  tokens, and automated check-in reminders.
                </p>
                <div className="flex items-center text-sm font-bold text-purple-600">
                  <span className="px-3 py-1 bg-purple-50 rounded-lg">
                    🤖 AI-Powered
                  </span>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-white border border-slate-100 p-8 rounded-[2.5rem] transition-all duration-500 hover:shadow-[0_40px_80px_-15px_rgba(79,70,229,0.15)] hover:-translate-y-3">
              <div className="relative z-10">
                <div className="w-16 h-16 mb-8 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-rose-200 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" />
                    <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Instant Alerts
                </h3>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  Multi-channel alerts via SMS, email, and push notifications
                  keep everyone informed and engaged.
                </p>
                <div className="flex items-center text-sm font-bold text-rose-600">
                  <span className="px-3 py-1 bg-rose-50 rounded-lg">
                    📱 Multi-Channel
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>

      <section
        id="how-it-works"
        className="relative py-24 bg-white overflow-hidden"
      >
        {/* Background Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-sm font-black tracking-[0.2em] uppercase text-indigo-600 mb-4">
              The Process
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Simple setup,{" "}
              <span className="italic font-serif text-indigo-600">
                powerful
              </span>{" "}
              results
            </h3>
            <div className="w-20 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            {/* Connector Line (Desktop Only) */}
            <div className="hidden md:block absolute top-1/4 left-0 w-full h-0.5 border-t-2 border-dashed border-slate-200 -z-0"></div>

            {/* Step 1 */}
            <div className="relative group">
              <div className="bg-white rounded-[32px] p-8 text-center border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(79,70,229,0.1)] hover:-translate-y-2">
                <div className="relative w-20 h-20 mx-auto mb-8">
                  <div className="absolute inset-0 bg-indigo-500 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-20"></div>
                  <div className="relative w-full h-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg shadow-indigo-200">
                    01
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
                  Setup & Integration
                </h4>
                <p className="text-slate-500 leading-relaxed">
                  Quick installation with existing hospital systems. No complex
                  configurations required.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="bg-white rounded-[32px] p-8 text-center border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(147,51,234,0.1)] hover:-translate-y-2">
                <div className="relative w-20 h-20 mx-auto mb-8">
                  <div className="absolute inset-0 bg-purple-500 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-20"></div>
                  <div className="relative w-full h-full bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg shadow-purple-200">
                    02
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-purple-600 transition-colors">
                  Doctor Onboarding
                </h4>
                <p className="text-slate-500 leading-relaxed">
                  Doctors download the app and start sharing their location and
                  status updates instantly.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="bg-white rounded-[32px] p-8 text-center border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(236,72,153,0.1)] hover:-translate-y-2">
                <div className="relative w-20 h-20 mx-auto mb-8">
                  <div className="absolute inset-0 bg-pink-500 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-20"></div>
                  <div className="relative w-full h-full bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg shadow-pink-200">
                    03
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-pink-600 transition-colors">
                  Patient Engagement
                </h4>
                <p className="text-slate-500 leading-relaxed">
                  Patients receive real-time updates and can check their queue
                  position anytime, anywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <IndustryFeatures />
      <ContactPage />

      <footer className="bg-[#0f172a] text-slate-300 pt-20 pb-10 relative overflow-hidden">
        {/* Subtle glow effect in the corner */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 pb-16 border-b border-slate-800/60">
            {/* Brand Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
                <span className="text-2xl font-black tracking-tight text-white">
                  DocTracker
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-sm text-sm">
                Next-generation patient management for modern healthcare
                providers. Built with precision, scaled for the world.
              </p>
              <div className="flex gap-4">
                {["Twitter", "LinkedIn", "GitHub"].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300"
                  >
                    <span className="sr-only">{platform}</span>
                    <div className="w-4 h-4 bg-current opacity-70"></div>
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
                Product
              </h4>
              <ul className="space-y-4 text-sm">
                {["Features", "How It Works", "Integrations", "Pricing"].map(
                  (link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="hover:text-indigo-400 transition-colors inline-flex items-center group"
                      >
                        <span className="w-0 group-hover:w-2 h-[1px] bg-indigo-400 mr-0 group-hover:mr-2 transition-all"></span>
                        {link}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
                Company
              </h4>
              <ul className="space-y-4 text-sm">
                {["About Us", "Careers", "Contact", "Press Kit"].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="hover:text-indigo-400 transition-colors inline-flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-[1px] bg-indigo-400 mr-0 group-hover:mr-2 transition-all"></span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
                Resources
              </h4>
              <ul className="space-y-4 text-sm">
                {["Help Center", "API Docs", "Security", "Status"].map(
                  (link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="hover:text-indigo-400 transition-colors inline-flex items-center group"
                      >
                        <span className="w-0 group-hover:w-2 h-[1px] bg-indigo-400 mr-0 group-hover:mr-2 transition-all"></span>
                        {link}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-8 text-xs font-medium text-slate-500">
              <p>© 2026 DocTracker Inc.</p>
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookies
              </a>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">
                Systems Operational
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
