import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PatientLanding = () => {
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
    <div className="font-sans bg-[#fcfdfe] text-slate-900 leading-relaxed overflow-x-hidden">
  <nav className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-md border-b border-blue-100/50 z-[1000] py-4">
    <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>
        <span className="text-xl font-black tracking-tight text-slate-900">DocTracker <span className="text-blue-600 font-medium">Care</span></span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Sign In</Link>
        <Link to="/signup" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/10">
          Join the Queue
        </Link>
      </div>
    </div>
  </nav>

  {/* Patient Hero */}
  <section className="pt-44 pb-24 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-blue-50/50 to-transparent -z-10"></div>
    
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <div>
        <div className="inline-flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 shadow-sm border border-blue-50">
          ✨ Your Time Matters
        </div>
        <h1 className="text-6xl lg:text-7xl font-black leading-[1.05] mb-8 text-slate-900 tracking-tight">
          Wait less. <br />
          <span className="text-blue-600">Heal faster.</span>
        </h1>
        <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-lg">
          No more guessing games in waiting rooms. Track your doctor's ETA, monitor your position in line, and arrive exactly when you're needed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/login" className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
            Track My Status
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>

      {/* Interactive Patient Mockup */}
      <div className="relative">
        <div className="bg-white rounded-[3rem] p-8 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.06)] border border-slate-100 relative z-10">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Current Provider</p>
                <h3 className="text-xl font-bold text-slate-900">Dr. Sarah Johnson</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20"/></svg>
              </div>
            </div>
            
            <div className="bg-blue-600 rounded-[2rem] p-6 text-white shadow-xl shadow-blue-600/20">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-bold opacity-80">Queue Status</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-tighter">On Time</span>
              </div>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-5xl font-black">12</span>
                <span className="text-xl font-bold mb-1 opacity-80">mins</span>
              </div>
              <p className="text-sm font-medium opacity-90">Estimated remaining wait time</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Position</p>
                <p className="text-xl font-black text-slate-900">#02</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ETA</p>
                <p className="text-xl font-black text-slate-900">14:20</p>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100/50 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-100/50 rounded-full blur-3xl -z-10"></div>
      </div>
    </div>
  </section>

  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { label: 'Wait Time Reduction', val: '45%', sub: 'Average decrease in lobby time' },
          { label: 'Patient Trust', val: '9.8/10', sub: 'Reported satisfaction score' },
          { label: 'Live Notifications', val: '2M+', sub: 'Alerts delivered this month' }
        ].map((stat, i) => (
          <div key={i} className="relative group p-8 rounded-[2.5rem] bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500">
            <div className="text-4xl font-black text-blue-600 mb-2">{stat.val}</div>
            <div className="text-lg font-bold text-slate-900 mb-1">{stat.label}</div>
            <div className="text-sm text-slate-500 font-medium">{stat.sub}</div>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section className="py-32 bg-[#fcfdfe]">
    <div className="max-w-7xl mx-auto px-6 text-center mb-20">
      <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-4">The Experience</h2>
      <p className="text-4xl font-black text-slate-900 tracking-tight">Healthcare on your schedule</p>
    </div>
    
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
      {[
        { title: 'Remote Check-in', desc: 'Secure your spot from home. No more early arrivals in crowded waiting rooms.', icon: '📱' },
        { title: 'Live GPS ETA', desc: "See your doctor's movement in real-time. Know exactly when they step into the clinic.", icon: '📍' },
        { title: 'Smart Alerts', desc: 'Get a nudge when you are "next up" so you can prepare for your consultation.', icon: '🔔' }
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col items-center text-center p-8 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-3xl mb-8">
            {item.icon}
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
  </div>
  );
};

export default PatientLanding;
