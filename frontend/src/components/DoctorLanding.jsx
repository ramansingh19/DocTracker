import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DoctorLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.nav-container')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <div className="font-sans bg-white text-gray-900 leading-relaxed overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-black/5 z-[1000] py-4 transition-all duration-300">
        <div className="nav-container max-w-[1200px] mx-auto px-8 flex justify-between items-center relative md:px-6">
          <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-xl">👨‍⚕️</div>
            <span>DocTracker - Doctor Portal</span>
          </div>
          <button 
            className={`flex flex-col justify-around w-[30px] h-[30px] bg-transparent border-0 cursor-pointer p-0 z-[1001] relative md:flex lg:hidden ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className={`w-full h-[3px] bg-gray-900 rounded transition-all duration-300 origin-center ${isMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
            <span className={`w-full h-[3px] bg-gray-900 rounded transition-all duration-300 origin-center ${isMenuOpen ? 'opacity-0 -translate-x-5' : ''}`}></span>
            <span className={`w-full h-[3px] bg-gray-900 rounded transition-all duration-300 origin-center ${isMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
          </button>
          <div className={`flex items-center gap-8 lg:gap-6 md:fixed md:top-[70px] md:left-0 md:right-0 md:bg-white/98 md:backdrop-blur-xl md:flex-col md:items-start md:p-8 md:gap-6 md:shadow-lg md:border-b md:border-black/5 md:transition-all md:duration-300 md:z-[999] ${isMenuOpen ? 'md:translate-y-0 md:opacity-100 md:visible' : 'md:-translate-y-full md:opacity-0 md:invisible'}`}>
            <Link to="/" className="text-slate-500 no-underline font-medium hover:text-emerald-500 transition-colors md:text-lg md:py-3 md:w-full md:border-b md:border-black/5" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/login" className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-xl no-underline font-semibold transition-all duration-300 shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(16,185,129,0.4)] md:w-full md:text-center" onClick={() => setIsMenuOpen(false)}>Login</Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-24 bg-gradient-to-br from-emerald-50 to-emerald-100 relative overflow-hidden md:pt-28 md:pb-16">
        <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-2 gap-16 items-center relative z-[2] md:grid-cols-1 md:gap-10 md:text-center md:px-6">
          <div className="max-w-[600px]">
            <div className="inline-block bg-emerald-500/10 text-emerald-600 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-emerald-500/20">👨‍⚕️ Doctor Portal</div>
            <h1 className="text-5xl font-extrabold leading-tight mb-6 text-gray-900 md:text-4xl">
              Streamline Your Medical Practice with
              <span className="bg-gradient-to-br from-emerald-500 to-emerald-600 bg-clip-text text-transparent"> Smart Technology</span>
            </h1>
            <p className="text-xl text-slate-500 mb-10 leading-relaxed md:text-base">
              Manage your schedule, update patient status, share your location, and optimize your workflow 
              with our comprehensive doctor management platform. Focus on what matters most - patient care.
            </p>
            <div className="flex gap-4 flex-wrap md:flex-col md:gap-4">
              <Link to="/login" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold no-underline transition-all duration-300 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(16,185,129,0.4)] md:w-full md:justify-center">
                <span>Access Dashboard</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold no-underline transition-all duration-300 border-2 border-emerald-500 text-emerald-500 bg-white hover:bg-emerald-500 hover:text-white hover:-translate-y-0.5 md:w-full md:justify-center">
                <span>Create Account</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 8V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 11H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
          <div className="flex justify-center md:mt-10">
            <div className="bg-white rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.1)] overflow-hidden w-full max-w-[400px]">
              <div className="bg-slate-50 px-6 py-4 flex items-center justify-between border-b border-slate-200">
                <div className="flex gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </div>
                <span className="font-semibold text-gray-700 text-sm">Doctor Dashboard</span>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border-2 border-emerald-200">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">📅</span>
                    <div className="flex-1">
                      <h4 className="m-0 text-sm font-semibold text-gray-900">Today's Schedule</h4>
                      <p className="m-0 text-xs text-slate-500">12 patients • 8:00 AM - 5:00 PM</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center flex-1"><span className="block text-sm font-bold text-emerald-500">8</span><span className="text-[0.625rem] text-slate-500">Completed</span></div>
                    <div className="text-center flex-1"><span className="block text-sm font-bold text-emerald-500">4</span><span className="text-[0.625rem] text-slate-500">Pending</span></div>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border-2 border-transparent">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">📍</span>
                    <div className="flex-1">
                      <h4 className="m-0 text-sm font-semibold text-gray-900">Location Sharing</h4>
                      <p className="m-0 text-xs text-slate-500">ETA: 15 minutes to hospital</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center flex-1"><span className="block text-sm font-bold text-emerald-500">Live</span><span className="text-[0.625rem] text-slate-500">GPS Tracking</span></div>
                    <div className="text-center flex-1"><span className="block text-sm font-bold text-emerald-500">5</span><span className="text-[0.625rem] text-slate-500">Patients Notified</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white md:py-16">
        <div className="max-w-[1200px] mx-auto px-8 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Doctor-Focused Features</h2>
            <p className="text-xl text-slate-500 max-w-[600px] mx-auto">
              Everything you need to manage your practice efficiently
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-8 md:grid-cols-1">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-[0_4px_15px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 border-t-4 border-t-emerald-500">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center mb-6 text-3xl">
                🤖
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Schedule Management</h3>
              <p className="text-slate-500 mb-6 leading-relaxed">AI-powered scheduling optimization, automatic patient reminders, and intelligent time slot allocation.</p>
              <div className="inline-block bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full text-xs font-semibold">
                <span>🤖 AI-Powered</span>
              </div>
            </div>
            {[
              { icon: '⚡', title: 'Real-Time Status Updates', desc: 'Update your availability status instantly. Patients get notified automatically when you\'re available.', tag: '⚡ Instant Updates' },
              { icon: '📍', title: 'GPS Location Sharing', desc: 'Share your location with patients for accurate ETA updates. Privacy controls ensure you\'re always in control.', tag: '🔒 Privacy Protected' },
              { icon: '📋', title: 'Patient Queue Management', desc: 'View and manage your patient queue in real-time. Prioritize urgent cases and optimize consultation flow.', tag: '📋 Smart Queue' },
              { icon: '📊', title: 'Analytics & Insights', desc: 'Track your performance metrics, patient satisfaction scores, and optimize your practice efficiency.', tag: '📊 Data-Driven' },
              { icon: '🚨', title: 'Emergency Alerts', desc: 'Receive instant notifications for emergency cases and urgent patient requests. Never miss critical situations.', tag: '🚨 Priority Alerts' },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-[0_4px_15px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 border-t-4 border-t-emerald-500">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center mb-6 text-3xl">{f.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{f.title}</h3>
                <p className="text-slate-500 mb-6 leading-relaxed">{f.desc}</p>
                <div className="inline-block bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full text-xs font-semibold">{f.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-emerald-50 to-emerald-100 md:py-16">
        <div className="max-w-[1200px] mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Transform Your Practice?</h2>
          <p className="text-xl text-slate-500 mb-10 max-w-[600px] mx-auto">Join thousands of doctors who have already improved their efficiency and patient satisfaction.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/login" className="inline-flex items-center gap-2 px-10 py-5 rounded-xl font-semibold no-underline bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 transition-all duration-300">Access Doctor Dashboard<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></Link>
            <Link to="/signup" className="inline-flex items-center gap-2 px-10 py-5 rounded-xl font-semibold no-underline border-2 border-emerald-500 text-emerald-500 bg-white hover:bg-emerald-500 hover:text-white hover:-translate-y-0.5 transition-all duration-300">Create Doctor Account<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 8V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M23 11H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></Link>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-[1200px] mx-auto px-8 md:px-6">
          <div className="grid grid-cols-[1fr_2fr] gap-16 mb-12 md:grid-cols-1 md:gap-8 md:text-center">
            <div className="max-w-[400px]">
              <div className="flex items-center gap-3 text-2xl font-bold mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">👨‍⚕️</div>
                <span>DocTracker</span>
              </div>
              <p className="text-slate-400 leading-relaxed">Empowering doctors with intelligent healthcare management tools.</p>
            </div>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-1">
              <div>
                <h4 className="text-base font-semibold mb-4">For Doctors</h4>
                <div className="flex flex-col gap-2">
                  <Link to="/login" className="text-slate-400 no-underline hover:text-emerald-500 transition-colors">Login</Link>
                  <Link to="/signup" className="text-slate-400 no-underline hover:text-emerald-500 transition-colors">Sign Up</Link>
                  <Link to="/doctor-dashboard" className="text-slate-400 no-underline hover:text-emerald-500 transition-colors">Dashboard</Link>
                  <a href="#" className="text-slate-400 no-underline hover:text-emerald-500 transition-colors">Features</a>
                </div>
              </div>
              <div>
                <h4 className="text-base font-semibold mb-4">Support</h4>
                <div className="flex flex-col gap-2">
                  <a href="#" className="text-slate-400 no-underline hover:text-emerald-500 transition-colors">Help Center</a>
                  <a href="#" className="text-slate-400 no-underline hover:text-emerald-500 transition-colors">Documentation</a>
                  <a href="#" className="text-slate-400 no-underline hover:text-emerald-500 transition-colors">Contact</a>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-slate-400 m-0">&copy; 2024 DocTracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DoctorLanding;
