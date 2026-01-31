import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminLanding = () => {
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
    <div className="font-sans bg-[#f8fafc] text-slate-900 leading-relaxed overflow-x-hidden">
  {/* Modern Admin Nav */}
  <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-violet-100 z-[1000] py-4">
    <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/30">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
          </svg>
        </div>
        <span className="text-xl font-bold tracking-tight">DocTracker <span className="text-violet-600">Enterprise</span></span>
      </div>
      <div className="flex items-center gap-6">
        <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-violet-600 transition-colors">Staff Login</Link>
        <Link to="/signup" className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-violet-600 transition-all">
          Request Demo
        </Link>
      </div>
    </div>
  </nav>

  {/* Admin Hero */}
  <section className="pt-40 pb-20 relative">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div>
        <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider mb-6">
          Admin Command Center
        </div>
        <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-6 text-slate-900">
          Control your clinic with <span className="text-violet-600 underline decoration-violet-200 underline-offset-8">Precision.</span>
        </h1>
        <p className="text-lg text-slate-500 mb-8 max-w-lg">
          The ultimate orchestration layer for modern hospitals. Manage doctor shifts, monitor patient throughput, and resolve bottlenecks in real-time.
        </p>
        <div className="flex gap-4">
          <Link to="/login" className="px-8 py-4 bg-violet-600 text-white rounded-xl font-bold shadow-xl shadow-violet-600/20 hover:bg-violet-700 transition-all">
            Access Dashboard
          </Link>
        </div>
      </div>

      {/* Complex Admin Dashboard Mockup */}
      <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-800 relative group">
        <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
          </div>
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Live System Feed v4.0</div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
            <div className="text-violet-400 text-xs font-bold mb-1 italic">Throughput</div>
            <div className="text-2xl font-black text-white">842 <span className="text-[10px] text-emerald-400">↑ 12%</span></div>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
            <div className="text-violet-400 text-xs font-bold mb-1 italic">Resources</div>
            <div className="text-2xl font-black text-white">94% <span className="text-[10px] text-slate-400">Active</span></div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <div className="text-xs text-slate-300 font-medium font-mono">DR_SARAH_J: Patient #402 Checked-in</div>
            <div className="ml-auto text-[10px] text-slate-500">2s ago</div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
            <div className="text-xs text-slate-300 font-medium font-mono">W_ROOM_B: Occupancy at 85% capacity</div>
            <div className="ml-auto text-[10px] text-slate-500">1m ago</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className="py-24 bg-white border-y border-slate-100">
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-16">
        <h2 className="text-3xl font-black text-slate-900 mb-4">Core Orchestration</h2>
        <p className="text-slate-500 font-medium">Tools designed for large-scale healthcare environments.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Fleet Management', desc: 'Real-time GPS tracking for all on-duty medical staff.', icon: '🛰️' },
          { title: 'Conflict Resolution', desc: 'AI-driven queue re-balancing for emergency cases.', icon: '⚖️' },
          { title: 'Auditing & Logs', desc: 'Full immutable history of every check-in and movement.', icon: '📑' },
          { title: 'API Integrations', desc: 'Seamlessly sync with your existing HL7/FHIR systems.', icon: '🔌' }
        ].map((feat, i) => (
          <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-violet-500 hover:bg-white transition-all group">
            <div className="text-3xl mb-4 grayscale group-hover:grayscale-0 transition-all">{feat.icon}</div>
            <h4 className="font-bold text-slate-900 mb-2">{feat.title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-violet-600/10 skew-x-12 translate-x-32"></div>
    <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
      <div className="flex-1">
        <h2 className="text-4xl font-black mb-6">Designed for 99.9% Uptime.</h2>
        <p className="text-slate-400 text-lg mb-8">
          In healthcare, seconds save lives. Our infrastructure is built on globally distributed servers ensuring your admin command center never goes dark.
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400">✓</div>
            <span className="font-bold">HIPAA & GDPR Compliant</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400">✓</div>
            <span className="font-bold">Enterprise SSO Integration</span>
          </div>
        </div>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-4">
        <div className="p-8 bg-white/5 rounded-3xl backdrop-blur-xl border border-white/10 text-center">
          <div className="text-4xl font-black text-violet-400 mb-2">2x</div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Patient ROI</div>
        </div>
        <div className="p-8 bg-white/5 rounded-3xl backdrop-blur-xl border border-white/10 text-center mt-8">
          <div className="text-4xl font-black text-violet-400 mb-2">-30%</div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">OpEx Costs</div>
        </div>
      </div>
    </div>
  </section>
  </div>


  );
};

export default AdminLanding;
