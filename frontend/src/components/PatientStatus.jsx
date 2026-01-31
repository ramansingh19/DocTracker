import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService, { getStoredUser } from '../services/authService';

const PatientStatus = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('status');
  const [doctorStatus, setDoctorStatus] = useState('in_transit');
  const [etaMinutes, setEtaMinutes] = useState(18);
  const [queuePosition, setQueuePosition] = useState(3);
  const [totalInQueue] = useState(12);
  const [arrivalStatus, setArrivalStatus] = useState('on_time'); // on_time | delayed | cancelled | emergency
  const [locationSharing, setLocationSharing] = useState(true);
  const [isConnected] = useState(true);
  const navigate = useNavigate();

  const doctor = {
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiology',
    photo: null,
  };

  const notifications = [
    { id: 1, icon: '📍', text: 'Dr. Johnson is on the way. Arriving in ~18 minutes.', time: '2 min ago', type: 'info' },
    { id: 2, icon: '✓', text: 'Your queue position updated: You are now #3 in line', time: '5 min ago', type: 'success' },
    { id: 3, icon: '⏰', text: 'Estimated wait time: 35–40 minutes', time: '10 min ago', type: 'info' },
    { id: 4, icon: '🏥', text: 'Check-in confirmed. Please wait in the OPD waiting area.', time: '15 min ago', type: 'success' },
    { id: 5, icon: '📋', text: 'Your slot: 10:30 AM – Cardiology OPD', time: '1 hour ago', type: 'info' },
  ];

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      navigate('/login');
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
    navigate('/login');
  };

  const getStatusConfig = (status) => {
    const configs = {
      in_transit: { label: 'In Transit', color: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500' },
      consulting: { label: 'Consulting', color: 'bg-amber-100 text-amber-800', dot: 'bg-amber-500' },
      in_ot: { label: 'In OT', color: 'bg-violet-100 text-violet-800', dot: 'bg-violet-500' },
      available: { label: 'Available', color: 'bg-emerald-100 text-emerald-800', dot: 'bg-emerald-500' },
    };
    return configs[status] || configs.in_transit;
  };

  const getArrivalAlertConfig = (status) => {
    const configs = {
      on_time: { label: 'On Time', icon: '✓', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800' },
      delayed: { label: 'Delayed', icon: '⏱', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800' },
      cancelled: { label: 'Cancelled', icon: '✕', bg: 'bg-slate-100', border: 'border-slate-200', text: 'text-slate-700' },
      emergency: { label: 'Emergency Reschedule', icon: '⚠', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800' },
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
  const progressPercent = Math.round(((totalInQueue - queuePosition) / totalInQueue) * 100);

  return (
    <div className="min-h-screen bg-teal-50/80 font-sans pb-24 max-w-lg mx-auto">
      {/* Header */}
      <header className="bg-white border-b border-slate-200/80 py-3 px-4 sticky top-0 z-50 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-teal-500 rounded-lg flex items-center justify-center text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
                <path d="M12 18L13.09 14.26L20 13L13.09 12.74L12 6L10.91 12.74L4 13L10.91 14.26L12 18Z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 m-0">DocTracker</h1>
              <p className="text-xs text-slate-500 m-0">Waiting Room</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-semibold text-sm">
              {user.name?.charAt(0) || 'P'}
            </div>
            <button onClick={handleLogout} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100" aria-label="Logout">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Tab bar */}
      <div className="flex border-b border-slate-200 bg-white sticky top-[52px] z-40">
        <button
          onClick={() => setActiveTab('status')}
          className={`flex-1 py-4 text-sm font-semibold transition-colors ${activeTab === 'status' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-slate-500'}`}
        >
          Status
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex-1 py-4 text-sm font-semibold transition-colors ${activeTab === 'notifications' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-slate-500'}`}
        >
          Notifications
        </button>
      </div>

      <main className="px-4 py-5">
        {activeTab === 'status' ? (
          <>
            {/* Arrival status banner */}
            <div className={`rounded-xl p-4 mb-5 border ${alertConfig.bg} ${alertConfig.border}`}>
              <div className="flex items-center gap-3">
                <span className={`text-xl ${alertConfig.text}`}>{alertConfig.icon}</span>
                <div>
                  <p className={`font-semibold text-sm m-0 ${alertConfig.text}`}>{alertConfig.label}</p>
                  <p className="text-slate-600 text-xs m-0 mt-0.5">
                    {arrivalStatus === 'on_time' && "We'll notify you the moment the doctor arrives."}
                    {arrivalStatus === 'delayed' && 'The doctor is running a few minutes late. Thank you for your patience.'}
                    {arrivalStatus === 'cancelled' && 'Please contact reception for rescheduling.'}
                    {arrivalStatus === 'emergency' && 'Your appointment has been rescheduled due to an emergency. Check notifications for details.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Prominent ETA countdown */}
            <div className="bg-white rounded-2xl p-6 mb-5 shadow-sm border border-slate-100 text-center">
              <p className="text-slate-500 text-sm font-medium mb-1">Arriving in</p>
              <p className="text-4xl font-bold text-teal-600 tabular-nums m-0">{etaMinutes}</p>
              <p className="text-teal-600 font-semibold text-lg m-0 mt-1">minutes</p>
              <p className="text-slate-400 text-xs mt-3 m-0">Live tracking • Updates automatically</p>
            </div>

            {/* Queue position with progress */}
            <div className="bg-white rounded-2xl p-5 mb-5 shadow-sm border border-slate-100">
              <p className="text-gray-900 font-semibold m-0 mb-1">You are #{queuePosition} in line</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-500 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-sm text-slate-500 font-medium tabular-nums">{totalInQueue - queuePosition} ahead</span>
              </div>
            </div>

            {/* Doctor card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-5">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 m-0">Your Doctor</h3>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                  👨‍⚕️
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-bold text-gray-900 m-0">{doctor.name}</h4>
                  <p className="text-slate-500 text-sm m-0">{doctor.specialization}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${statusConfig.color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
                      {statusConfig.label}
                    </span>
                    <span className="text-slate-500 text-xs font-medium">ETA: {etaMinutes} min</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional map placeholder */}
            {locationSharing && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900 m-0">Doctor's Route</h3>
                  <span className="text-xs text-teal-600 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" /> Live
                  </span>
                </div>
                <div className="h-32 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 text-sm">
                  Map preview • Location sharing enabled
                </div>
              </div>
            )}

            {/* Reassurance microcopy */}
            <p className="text-center text-slate-500 text-sm py-4">
              We'll notify you the moment the doctor arrives. Please stay in the waiting area.
            </p>

            {/* Live indicator */}
            <div className={`flex items-center justify-center gap-2 py-2 ${isConnected ? 'text-emerald-600' : 'text-slate-400'}`}>
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
              <span className="text-sm font-medium">{isConnected ? 'Live updates active' : 'Offline'}</span>
            </div>
          </>
        ) : (
          /* Notification History */
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900 m-0 mb-4">Notification History</h3>
            {notifications.map((n) => (
              <div
                key={n.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex gap-4 hover:border-teal-100 transition-colors"
              >
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 flex-shrink-0">
                  {n.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 font-medium text-sm m-0 leading-snug">{n.text}</p>
                  <p className="text-slate-400 text-xs mt-1 m-0">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white border-t border-slate-200 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex gap-3">
          <button className="flex-1 py-4 rounded-xl font-semibold bg-teal-600 text-white hover:bg-teal-700 active:scale-[0.99] transition-all">
            Check In
          </button>
          <button className="flex-1 py-4 rounded-xl font-semibold border-2 border-slate-200 text-slate-600 hover:border-teal-300 hover:text-teal-600 transition-all">
            Reschedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientStatus;
