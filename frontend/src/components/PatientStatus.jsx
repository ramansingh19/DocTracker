import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService, { getStoredUser } from "../services/authService";

const PatientStatus = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("status");
  const [doctorStatus, setDoctorStatus] = useState("in_transit");
  const [etaMinutes, setEtaMinutes] = useState(18);
  const [queuePosition, setQueuePosition] = useState(3);
  const [totalInQueue] = useState(12);
  const [arrivalStatus, setArrivalStatus] = useState("on_time"); // on_time | delayed | cancelled | emergency
  const [locationSharing, setLocationSharing] = useState(true);
  const [isConnected] = useState(true);
  const navigate = useNavigate();

  const doctor = {
    name: "Dr. Sarah Johnson",
    specialization: "Cardiology",
    photo: null,
  };

  const notifications = [
    {
      id: 1,
      icon: "📍",
      text: "Dr. Johnson is on the way. Arriving in ~18 minutes.",
      time: "2 min ago",
      type: "info",
    },
    {
      id: 2,
      icon: "✓",
      text: "Your queue position updated: You are now #3 in line",
      time: "5 min ago",
      type: "success",
    },
    {
      id: 3,
      icon: "⏰",
      text: "Estimated wait time: 35–40 minutes",
      time: "10 min ago",
      type: "info",
    },
    {
      id: 4,
      icon: "🏥",
      text: "Check-in confirmed. Please wait in the OPD waiting area.",
      time: "15 min ago",
      type: "success",
    },
    {
      id: 5,
      icon: "📋",
      text: "Your slot: 10:30 AM – Cardiology OPD",
      time: "1 hour ago",
      type: "info",
    },
  ];

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(storedUser);

    const interval = setInterval(() => {
      setEtaMinutes((prev) => Math.max(1, prev - 1));
      if (Math.random() > 0.9) {
        setQueuePosition((prev) => Math.max(1, prev - 1));
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [navigate]);

  const handleLogout = () => {
    authService.clearSession();
    navigate("/login");
  };

  const getStatusConfig = (status) => {
    const configs = {
      in_transit: {
        label: "In Transit",
        color: "bg-blue-100 text-blue-800",
        dot: "bg-blue-500",
      },
      consulting: {
        label: "Consulting",
        color: "bg-amber-100 text-amber-800",
        dot: "bg-amber-500",
      },
      in_ot: {
        label: "In OT",
        color: "bg-violet-100 text-violet-800",
        dot: "bg-violet-500",
      },
      available: {
        label: "Available",
        color: "bg-emerald-100 text-emerald-800",
        dot: "bg-emerald-500",
      },
    };
    return configs[status] || configs.in_transit;
  };

  const getArrivalAlertConfig = (status) => {
    const configs = {
      on_time: {
        label: "On Time",
        icon: "✓",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        text: "text-emerald-800",
      },
      delayed: {
        label: "Delayed",
        icon: "⏱",
        bg: "bg-amber-50",
        border: "border-amber-200",
        text: "text-amber-800",
      },
      cancelled: {
        label: "Cancelled",
        icon: "✕",
        bg: "bg-slate-100",
        border: "border-slate-200",
        text: "text-slate-700",
      },
      emergency: {
        label: "Emergency Reschedule",
        icon: "⚠",
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-800",
      },
    };
    return configs[status] || configs.on_time;
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-teal-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
          <p className="text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(doctorStatus);
  const alertConfig = getArrivalAlertConfig(arrivalStatus);
  const progressPercent = Math.round(
    ((totalInQueue - queuePosition) / totalInQueue) * 100,
  );

  return (
    /* Main Wrapper: Full width on mobile, centered constrained on desktop */
<div className="min-h-screen bg-[#f8fafc] font-sans pb-32">
  
  {/* Header: Responsive max-width */}
  <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/40 px-6 py-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-teal-200">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">DocTracker</h1>
          <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest mt-1">Patient Portal</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:block text-right">
           <p className="text-xs font-bold text-slate-900">{user.name || "Patient"}</p>
           <p className="text-[10px] text-slate-500 uppercase">ID: #4421</p>
        </div>
        <button onClick={handleLogout} className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-rose-500 transition-colors border border-slate-100">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" /></svg>
        </button>
      </div>
    </div>
  </header>

  <main className="max-w-7xl mx-auto px-6 py-8">
    {/* Responsive Grid Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* Left Column: Main Status (8 Units on Desktop) */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Tab Navigation (Inside main for desktop flow) */}
        <div className="flex p-1.5 bg-slate-200/50 rounded-2xl w-full md:w-fit shadow-inner">
          <button onClick={() => setActiveTab("status")} className={`px-8 py-2.5 text-xs font-black uppercase rounded-xl transition-all ${activeTab === "status" ? "bg-white text-teal-600 shadow-sm" : "text-slate-500"}`}>Live Status</button>
          <button onClick={() => setActiveTab("notifications")} className={`px-8 py-2.5 text-xs font-black uppercase rounded-xl transition-all ${activeTab === "notifications" ? "bg-white text-teal-600 shadow-sm" : "text-slate-500"}`}>Alerts</button>
        </div>

        {activeTab === "status" ? (
          <>
            {/* Arrival Banner */}
            <div className={`rounded-[2rem] p-6 border-2 ${alertConfig.bg} ${alertConfig.border} shadow-xl shadow-slate-200/40`}>
              <div className="flex items-center gap-5">
                <span className="text-4xl">{alertConfig.icon}</span>
                <div>
                  <h2 className={`font-black uppercase tracking-tight ${alertConfig.text}`}>{alertConfig.label}</h2>
                  <p className="text-slate-600 text-sm mt-1 font-medium">Auto-refreshing every 30 seconds...</p>
                </div>
              </div>
            </div>

            {/* Hero ETA Section */}
            <div className="bg-white rounded-[2.5rem] p-12 shadow-xl shadow-slate-200/60 border border-slate-100 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-2">Estimated Arrival</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-8xl font-black text-slate-900 tabular-nums">{etaMinutes}</span>
                  <span className="text-teal-500 font-black text-2xl uppercase">min</span>
                </div>
              </div>
              <div className="mt-8 md:mt-0 px-8 py-4 bg-teal-50 rounded-3xl border border-teal-100">
                <p className="text-teal-700 font-bold text-sm">On Time Performance</p>
                <p className="text-teal-600/70 text-xs">Based on current traffic</p>
              </div>
            </div>

            {/* Desktop Queue & Route Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl">
                  <p className="text-teal-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Live Queue</p>
                  <h3 className="text-3xl font-bold mb-4">#{queuePosition} <span className="text-lg font-light text-slate-400">in line</span></h3>
                  <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.5)] transition-all duration-1000" style={{ width: `${progressPercent}%` }} />
                  </div>
               </div>
               
               {locationSharing && (
                  <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-lg">
                    <div className="flex justify-between mb-4">
                       <p className="text-slate-900 font-black text-xs uppercase">Route Map</p>
                       <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-ping" />
                    </div>
                    <div className="h-24 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 text-xs border border-dashed border-slate-200">
                       GPS Feed Active
                    </div>
                  </div>
               )}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-lg space-y-4">
             {notifications.map(n => (
               <div key={n.id} className="flex gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-all">
                  <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-2xl">{n.icon}</div>
                  <div>
                    <p className="font-bold text-slate-800">{n.text}</p>
                    <p className="text-xs text-slate-400 font-bold uppercase">{n.time}</p>
                  </div>
               </div>
             ))}
          </div>
        )}
      </div>

      {/* Right Column: Doctor Sidebar (4 Units on Desktop) */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-28">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">Assigned Specialist</p>
          <div className="text-center">
            <div className="w-24 h-24 bg-slate-50 rounded-[2rem] mx-auto mb-4 flex items-center justify-center text-5xl shadow-inner border border-slate-100">
              👨‍⚕️
            </div>
            <h4 className="text-xl font-black text-slate-900">{doctor.name}</h4>
            <p className="text-teal-600 font-bold text-xs uppercase tracking-wider mb-6">{doctor.specialization}</p>
            
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase ${statusConfig.color}`}>
              <span className={`w-2 h-2 rounded-full ${statusConfig.dot}`} />
              {statusConfig.label}
            </div>
          </div>

          <hr className="my-8 border-slate-100" />

          <div className="space-y-4">
            <button className="w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-slate-900 text-white shadow-lg hover:bg-teal-600 transition-all active:scale-95">
              Check In
            </button>
            <button className="w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest border-2 border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">
              Reschedule
            </button>
          </div>
        </div>
      </div>

    </div>
  </main>
</div>
  );
};

export default PatientStatus;
