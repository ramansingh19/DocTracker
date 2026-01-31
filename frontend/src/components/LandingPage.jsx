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
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200/80 z-[1000] py-3 sm:py-4 shadow-sm">
        <div
          ref={navRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative"
        >
          <div className="flex items-center gap-3 text-2xl font-bold text-gray-900 no-underline sm:text-xl">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white transition-transform duration-300 hover:scale-105 sm:w-[35px] sm:h-[35px]">
              <img
                src="https://i.pinimg.com/736x/3b/df/57/3bdf5702d98a357455ff4027786c3d96.jpg"
                alt="DocTracker Logo"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <span className="bg-gradient-to-br from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              DocTracker
            </span>
          </div>
          <button
            className={`flex flex-col justify-around w-[30px] h-[30px] bg-transparent border-0 cursor-pointer p-0 z-[1001] relative md:flex lg:hidden ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span
              className={`w-full h-[3px] bg-gray-900 rounded-[3px] transition-all duration-300 origin-center ${isMenuOpen ? "rotate-45 translate-y-[8px]" : ""}`}
            ></span>
            <span
              className={`w-full h-[3px] bg-gray-900 rounded-[3px] transition-all duration-300 origin-center ${isMenuOpen ? "opacity-0 -translate-x-5" : ""}`}
            ></span>
            <span
              className={`w-full h-[3px] bg-gray-900 rounded-[3px] transition-all duration-300 origin-center ${isMenuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`}
            ></span>
          </button>
          <div
            className={`flex items-center gap-10 lg:gap-6 md:fixed md:top-[70px] md:left-0 md:right-0 md:bg-white/98 md:backdrop-blur-xl md:flex-col md:items-start md:p-8 md:gap-6 md:shadow-lg md:border-b md:border-black/5 md:transition-all md:duration-300 md:z-[999] ${isMenuOpen ? "md:translate-y-0 md:opacity-100 md:visible" : "md:-translate-y-full md:opacity-0 md:invisible"}`}
          >
            <a
              href="#features"
              className="text-slate-500 no-underline font-medium text-[0.95rem] transition-colors duration-300 relative hover:text-indigo-500 md:text-[1.1rem] md:py-3 md:w-full md:border-b md:border-black/5"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-slate-500 no-underline font-medium text-[0.95rem] transition-colors duration-300 relative hover:text-indigo-500 md:text-[1.1rem] md:py-3 md:w-full md:border-b md:border-black/5"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#ContactPage"
              className="text-slate-500 no-underline font-medium text-[0.95rem] transition-colors duration-300 relative hover:text-indigo-500 md:text-[1.1rem] md:py-3 md:w-full md:border-b md:border-black/5"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <Link
              to="/login"
              className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl no-underline font-semibold text-[0.95rem] transition-all duration-300 shadow-[0_4px_15px_rgba(102,126,234,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(102,126,234,0.4)] md:w-full md:text-center md:justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-28 sm:pt-32 pb-20 w-100% sm:pb-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-[2]">
          <div className="max-w-xl lg:max-w-none md:text-center lg:text-left">
            <div className="inline-block bg-indigo-500/10 text-indigo-500 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-indigo-500/20">
              <span>🏥 Healthcare Innovation</span>
            </div>
            <h1 className="text-[3.5rem] font-extrabold leading-[1.1] mb-6 text-gray-900 md:text-[2rem] sm:text-[1.75rem]">
              Transform Your Hospital's
              <span className="bg-gradient-to-br from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Patient Experience
              </span>
            </h1>
            <p className="text-xl text-slate-500 mb-10 leading-[1.7] md:text-base sm:text-[0.95rem] md:px-4 sm:px-0">
              Revolutionize healthcare delivery with real-time doctor tracking,
              intelligent queue management, and seamless patient communication.
              Reduce wait times by up to 60% and boost patient satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12 md:justify-center lg:justify-start">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base no-underline transition-all duration-300 border-0 cursor-pointer bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-[0_4px_15px_rgba(102,126,234,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(102,126,234,0.4)] md:w-full md:justify-center sm:px-6 sm:py-3.5 sm:text-[0.95rem]"
              >
                <span>Get Started</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <a
                href="https://www.youtube.com/watch?v=8QyBBqlKkbQ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base no-underline transition-all duration-300 border-2 border-slate-200 bg-white text-slate-500 shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 hover:border-indigo-500 hover:text-indigo-500 hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)] md:w-full md:justify-center sm:px-6 sm:py-3.5 sm:text-[0.95rem]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                </svg>
                <span>Watch Demo</span>
              </a>
            </div>

            {/* Role Selection Section - FIXED */}
            <div className="mt-12 text-center">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
                Choose Your Role
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
                {/* Doctors - SPANS 2 COLUMNS + FIXED FLEX */}
                <Link
                  to="/doctor-landing"
                  className="md:col-span-2 flex-[2] group flex items-center gap-5 p-8 bg-white border-2 border-gray-200 rounded-2xl no-underline text-inherit transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.05)] relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)] hover:border-emerald-500 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-emerald-100"
                >
                  <div className="text-[2.75rem] w-[70px] h-[70px] flex items-center justify-center bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex-shrink-0">
                    👨‍⚕️
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <h4 className="text-2xl font-semibold text-gray-900 mb-3">
                      For Doctors
                    </h4>
                    <p className="text-lg text-slate-500 m-0 leading-relaxed">
                      Manage your schedule, update status, and track patients in
                      real-time
                    </p>
                  </div>
                  <svg
                    className="text-gray-400 transition-all duration-300 group-hover:text-gray-700 group-hover:translate-x-1 flex-shrink-0"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>

                {/* Patients */}
                <Link
                  to="/patient-landing"
                  className="flex-1 group flex items-center gap-4 p-6 bg-white border-2 border-gray-200 rounded-2xl no-underline text-inherit transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.05)] relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)] hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100"
                >
                  <div className="text-[2.5rem] w-[60px] h-[60px] flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex-shrink-0">
                    👤
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      For Patients
                    </h4>
                    <p className="text-[0.95rem] text-slate-500 m-0">
                      Track your queue position and doctor availability
                    </p>
                  </div>
                  <svg
                    className="text-gray-400 transition-all duration-300 group-hover:text-gray-700 group-hover:translate-x-1 flex-shrink-0"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>

                {/* Admin */}
                <Link
                  to="/admin-landing"
                  className="flex-1 group flex items-center gap-4 p-6 bg-white border-2 border-gray-200 rounded-2xl no-underline text-inherit transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.05)] relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)] hover:border-purple-500 hover:bg-gradient-to-br hover:from-purple-50 hover:to-purple-100"
                >
                  <div className="text-[2.5rem] w-[60px] h-[60px] flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex-shrink-0">
                    👨‍💼
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      For Administrators
                    </h4>
                    <p className="text-[0.95rem] text-slate-500 m-0">
                      Monitor system performance and manage operations
                    </p>
                  </div>
                  <svg
                    className="text-gray-400 transition-all duration-300 group-hover:text-gray-700 group-hover:translate-x-1 flex-shrink-0"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8 flex-wrap md:justify-center md:gap-6 sm:gap-4 mt-16">
              <div className="flex flex-col items-center text-center">
                <span className="text-[2rem] font-extrabold text-indigo-500 leading-none sm:text-[1.75rem]">
                  500+
                </span>
                <span className="text-sm text-slate-500 font-medium mt-1 sm:text-sm">
                  Hospitals
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-[2rem] font-extrabold text-indigo-500 leading-none sm:text-[1.75rem]">
                  60%
                </span>
                <span className="text-sm text-slate-500 font-medium mt-1 sm:text-sm">
                  Wait Reduction
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-[2rem] font-extrabold text-indigo-500 leading-none sm:text-[1.75rem]">
                  99.9%
                </span>
                <span className="text-sm text-slate-500 font-medium mt-1 sm:text-sm">
                  Uptime
                </span>
              </div>
            </div>
          </div>

          {/* Dashboard Mockup - unchanged */}
          <div className="flex justify-center items-center md:mt-10">
            <div className="bg-white rounded-[20px] shadow-[0_25px_50px_rgba(0,0,0,0.15)] overflow-hidden w-full max-w-[500px] transition-transform duration-300 hover:scale-[1.02] md:transform-none md:mt-8">
              {/* Dashboard content unchanged - keeping it exactly as you had it */}
              <div className="bg-slate-50 px-6 py-4 flex items-center gap-4 border-b border-slate-200">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                </div>
                <div className="font-semibold text-gray-700 text-sm">
                  DocTracker Dashboard
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <div className="bg-gradient-to-br from-indigo-500/5 to-purple-600/5 rounded-xl p-4 border-2 border-indigo-500/20 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">👨‍⚕️</span>
                    <div className="flex-1">
                      <h4 className="m-0 text-sm font-semibold text-gray-900">
                        Dr. Sarah Johnson
                      </h4>
                      <p className="m-0 text-xs text-slate-500">
                        Cardiology • Available
                      </p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 ml-auto shadow-[0_0_0_2px_rgba(16,185,129,0.2)]"></div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center flex-1">
                      <span className="block text-sm font-bold text-indigo-500">
                        8
                      </span>
                      <span className="text-[0.625rem] text-slate-500 font-medium">
                        Patients Today
                      </span>
                    </div>
                    <div className="text-center flex-1">
                      <span className="block text-sm font-bold text-indigo-500">
                        5min
                      </span>
                      <span className="text-[0.625rem] text-slate-500 font-medium">
                        Avg. Wait
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border-2 border-transparent transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">👩‍⚕️</span>
                    <div className="flex-1">
                      <h4 className="m-0 text-sm font-semibold text-gray-900">
                        Dr. Michael Chen
                      </h4>
                      <p className="m-0 text-xs text-slate-500">
                        Orthopedics • In Transit
                      </p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-amber-500 ml-auto shadow-[0_0_0_2px_rgba(245,158,11,0.2)]"></div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center flex-1">
                      <span className="block text-sm font-bold text-indigo-500">
                        12
                      </span>
                      <span className="text-[0.625rem] text-slate-500 font-medium">
                        Patients Today
                      </span>
                    </div>
                    <div className="text-center flex-1">
                      <span className="block text-sm font-bold text-indigo-500">
                        15min
                      </span>
                      <span className="text-[0.625rem] text-slate-500 font-medium">
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

      <section id="features" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-12">
            <h2 className="text-[2.5rem] font-extrabold text-gray-900 mb-4 leading-tight md:text-[1.75rem]">
              Powerful Features for Modern Healthcare
            </h2>
            <p className="text-xl text-slate-500 max-w-[600px] mx-auto md:text-lg">
              Everything you need to streamline operations and enhance patient
              care
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-8 md:grid-cols-1 md:gap-6">
            <div className="bg-white border border-slate-200 rounded-[20px] p-10 text-center transition-all duration-300 relative overflow-hidden group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:border-indigo-500/20 md:p-6">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-br from-indigo-500 to-purple-600 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-[20px] flex items-center justify-center mx-auto mb-6 text-indigo-500 transition-transform duration-300 group-hover:scale-110">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Real-Time Tracking
              </h3>
              <p className="text-slate-500 mb-6 leading-relaxed">
                Monitor doctor locations and arrival times with GPS precision.
                Patients get accurate ETAs and automatic notifications.
              </p>
              <div className="inline-block bg-indigo-500/10 text-indigo-500 px-4 py-2 rounded-full text-sm font-semibold">
                <span>⚡ Live Updates</span>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-[20px] p-10 text-center transition-all duration-300 relative overflow-hidden group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:border-indigo-500/20 md:p-6">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-br from-indigo-500 to-purple-600 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-[20px] flex items-center justify-center mx-auto mb-6 text-indigo-500 transition-transform duration-300 group-hover:scale-110">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 11H15M9 15H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V19C19 20.1046 18.1046 21 17 21Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Smart Queue Management
              </h3>
              <p className="text-slate-500 mb-6 leading-relaxed">
                Intelligent patient queuing with priority handling, virtual
                tokens, and automated check-in reminders.
              </p>
              <div className="inline-block bg-indigo-500/10 text-indigo-500 px-4 py-2 rounded-full text-sm font-semibold">
                <span>🤖 AI-Powered</span>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-[20px] p-10 text-center transition-all duration-300 relative overflow-hidden group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:border-indigo-500/20 md:p-6">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-br from-indigo-500 to-purple-600 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-[20px] flex items-center justify-center mx-auto mb-6 text-indigo-500 transition-transform duration-300 group-hover:scale-110">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Instant Notifications
              </h3>
              <p className="text-slate-500 mb-6 leading-relaxed">
                Multi-channel alerts via SMS, email, and push notifications keep
                everyone informed and engaged.
              </p>
              <div className="inline-block bg-indigo-500/10 text-indigo-500 px-4 py-2 rounded-full text-sm font-semibold">
                <span>📱 Multi-Channel</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[2.5rem] font-extrabold text-gray-900 mb-4 leading-tight md:text-[1.75rem]">
              How It Works
            </h2>
            <p className="text-xl text-slate-500 max-w-[600px] mx-auto md:text-lg">
              Simple setup, powerful results
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mt-12 md:grid-cols-1 md:gap-6">
            <div className="bg-white rounded-[20px] p-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-1 md:p-6">
              <div className="w-[60px] h-[60px] bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-extrabold mx-auto mb-6">
                01
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Setup & Integration
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Quick installation with existing hospital systems. No complex
                configurations required.
              </p>
            </div>
            <div className="bg-white rounded-[20px] p-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-1 md:p-6">
              <div className="w-[60px] h-[60px] bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-extrabold mx-auto mb-6">
                02
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Doctor Onboarding
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Doctors download the app and start sharing their location and
                status updates.
              </p>
            </div>
            <div className="bg-white rounded-[20px] p-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-1 md:p-6">
              <div className="w-[60px] h-[60px] bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-extrabold mx-auto mb-6">
                03
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Patient Engagement
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Patients receive real-time updates and can check their queue
                position anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      <IndustryFeatures />
      <ContactPage />

      <footer className="bg-slate-900 text-white pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-[1fr_2fr] gap-16 mb-12 md:grid-cols-1 md:gap-8 md:text-center">
            <div className="max-w-[400px]">
              <div className="flex items-center gap-3 text-2xl font-bold mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                      fill="currentColor"
                    />
                    <path
                      d="M12 18L13.09 14.26L20 13L13.09 12.74L12 6L10.91 12.74L4 13L10.91 14.26L12 18Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <span>DocTracker</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Transforming healthcare delivery through intelligent patient
                management.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8 md:grid-cols-1 md:gap-6">
              <div>
                <h4 className="text-base font-semibold mb-4 text-white">
                  Product
                </h4>
                <div className="flex flex-col gap-2">
                  <a
                    href="#features"
                    className="block text-slate-400 no-underline mb-2 transition-colors duration-300 hover:text-indigo-500"
                  >
                    Features
                  </a>
                  <a
                    href="#how-it-works"
                    className="block text-slate-400 no-underline mb-2 transition-colors duration-300 hover:text-indigo-500"
                  >
                    How It Works
                  </a>
                  <a
                    href="#"
                    className="block text-slate-400 no-underline mb-2 transition-colors duration-300 hover:text-indigo-500"
                  >
                    Pricing
                  </a>
                </div>
              </div>
              <div>
                <h4 className="text-base font-semibold mb-4 text-white">
                  Company
                </h4>
                <div className="flex flex-col gap-2">
                  <a
                    href="#"
                    className="block text-slate-400 no-underline mb-2 transition-colors duration-300 hover:text-indigo-500"
                  >
                    About
                  </a>
                  <a
                    href="#"
                    className="block text-slate-400 no-underline mb-2 transition-colors duration-300 hover:text-indigo-500"
                  >
                    Careers
                  </a>
                  <a
                    href="#ContactPage"
                    className="block text-slate-400 no-underline mb-2 transition-colors duration-300 hover:text-indigo-500"
                  >
                    Contact
                  </a>
                  <a
                    href="#"
                    className="block text-slate-400 no-underline mb-2 transition-colors duration-300 hover:text-indigo-500"
                  >
                    Blog
                  </a>
                </div>
              </div>
              <div>
                <h4 className="text-base font-semibold mb-4 text-white">
                  Support
                </h4>
                <div className="flex flex-col gap-2">
                  <a
                    href="#"
                    className="block text-slate-400 no-underline mb-2 transition-colors duration-300 hover:text-indigo-500"
                  >
                    Help Center
                  </a>
                  <a
                    href="#"
                    className="block text-slate-400 no-underline mb-2 transition-colors duration-300 hover:text-indigo-500"
                  >
                    Documentation
                  </a>
                  <a
                    href="#"
                    className="block text-slate-400 no-underline mb-2 transition-colors duration-300 hover:text-indigo-500"
                  >
                    Status
                  </a>
                  <a
                    href="#"
                    className="block text-slate-400 no-underline mb-2 transition-colors duration-300 hover:text-indigo-500"
                  >
                    Security
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center pt-8 border-t border-gray-800 md:flex-col md:gap-4 md:text-center">
            <p className="text-slate-400 m-0">
              &copy; 2025 DocTracker. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-slate-400 no-underline transition-colors duration-300 hover:text-indigo-500"
              >
                Twitter
              </a>
              <a
                href="https://www.linkedin.com/in/raman-kumar0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 no-underline transition-colors duration-300 hover:text-indigo-500"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/ramansingh19"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 no-underline transition-colors duration-300 hover:text-indigo-500"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
