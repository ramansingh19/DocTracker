import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DoctorLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".nav-container")) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <div className="font-sans bg-[#f8fafc] text-slate-900 leading-relaxed overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200/60 z-[1000] py-3 transition-all">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white"
              >
                <path
                  d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">
              DocTracker <span className="text-teal-600 font-medium">Pro</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-bold text-slate-500 hover:text-teal-600 transition-colors"
            >
              Platform
            </Link>
            <Link
              to="/login"
              className="text-sm font-bold text-slate-900 hover:text-teal-600 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-teal-600 transition-all shadow-xl shadow-slate-900/10"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 skew-x-[-12deg] translate-x-32 z-0 hidden lg:block"></div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-teal-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              Specialized Provider Portal
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] mb-8 text-slate-900 tracking-tight">
              Modern Care. <br />
              <span className="text-teal-600">Unified Workflow.</span>
            </h1>
            <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-xl">
              The all-in-one operating system for medical professionals. Manage
              patient flow, real-time telemetry, and practice analytics through
              one intuitive interface.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/login"
                className="px-8 py-5 bg-teal-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-teal-600/30 hover:bg-teal-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
              >
                Open Dashboard
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
              </Link>
              <Link
                to="/signup"
                className="px-8 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-bold text-lg hover:border-teal-200 hover:bg-teal-50/30 transition-all flex items-center justify-center"
              >
                Create Provider Account
              </Link>
            </div>
          </div>

          {/* Floating Dashboard Preview */}
          <div className="relative">
            <div className="absolute inset-0 bg-teal-500/20 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#0f172a] rounded-[2rem] p-4 shadow-2xl border border-white/10 scale-105 lg:scale-110">
              <div className="flex gap-1.5 mb-4 px-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50"></div>
              </div>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-5 border border-white/5">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-white font-bold">Patient Queue</span>
                    <span className="bg-teal-500 text-[10px] font-black px-2 py-0.5 rounded text-white uppercase tracking-tighter">
                      Live
                    </span>
                  </div>
                  <div className="space-y-3">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="h-12 bg-white/5 rounded-lg animate-pulse"
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-teal-500/10 p-4 rounded-xl border border-teal-500/20 text-teal-400">
                    <div className="text-2xl font-black">12</div>
                    <div className="text-[10px] uppercase font-bold tracking-widest">
                      Appointments
                    </div>
                  </div>
                  <div className="bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20 text-indigo-400">
                    <div className="text-2xl font-black">98%</div>
                    <div className="text-[10px] uppercase font-bold tracking-widest">
                      Satisfaction
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Feature Grid (Enterprise Cards) */}
      <section className="py-32 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6 text-center mb-20">
          <h2 className="text-sm font-black text-teal-600 uppercase tracking-[0.3em] mb-4">
            Infrastructure
          </h2>
          <p className="text-4xl font-black text-slate-900 tracking-tight">
            Built for Professional Excellence
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "AI Queue Logic",
              desc: "Predictive patient arrival models and smart duration estimation.",
              icon: "🧠",
            },
            {
              title: "Secure Telemetry",
              desc: "End-to-end encrypted GPS and status sharing for rapid response.",
              icon: "📡",
            },
            {
              title: "Practice Insights",
              desc: "Granular data on patient turnover and peak performance hours.",
              icon: "📊",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="group p-8 bg-white rounded-[2rem] border border-slate-200/60 hover:border-teal-500/30 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)]"
            >
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl mb-8 group-hover:bg-teal-500 group-hover:text-white transition-all">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {feature.desc}
              </p>
              <div className="h-1 w-0 group-hover:w-full bg-teal-500/20 transition-all duration-500 rounded-full"></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DoctorLanding;
