import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService, { getStoredUser } from '../services/authService';

const DoctorDashboard = () => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('in_opd');
  const [locationSharing, setLocationSharing] = useState(false);
  const [showDelayModal, setShowDelayModal] = useState(false);
  const [delayMinutes, setDelayMinutes] = useState(20);
  const [delayNotified, setDelayNotified] = useState(false);
  const [location, setLocation] = useState({ lat: 28.6139, lng: 77.209 });
  const navigate = useNavigate();

  const statusOptions = [
    { id: 'on_the_way', label: 'On the way', icon: '🚗', color: 'bg-blue-500 hover:bg-blue-600' },
    { id: 'in_opd', label: 'In OPD', icon: '🩺', color: 'bg-teal-600 hover:bg-teal-700' },
    { id: 'in_ot', label: 'In OT', icon: '🏥', color: 'bg-violet-600 hover:bg-violet-700' },
    { id: 'break', label: 'Break', icon: '☕', color: 'bg-amber-500 hover:bg-amber-600' },
    { id: 'emergency', label: 'Emergency', icon: '🚨', color: 'bg-red-600 hover:bg-red-700' },
  ];

  const schedule = [
    { time: '9:00 AM – 10:00 AM', slot: 'OPD Slot 1', waiting: 8 },
    { time: '10:30 AM – 11:30 AM', slot: 'OPD Slot 2', waiting: 5 },
    { time: '12:00 PM – 1:00 PM', slot: 'OPD Slot 3', waiting: 0 },
    { time: '2:00 PM – 4:00 PM', slot: 'Surgery / OT', waiting: 0 },
  ];

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(storedUser);
  }, [navigate]);

  const handleLocationSharing = (enabled) => {
    setLocationSharing(enabled);
    if (enabled && navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => {},
        { enableHighAccuracy: true }
      );
    }
  };

  const handleNotifyDelay = () => {
    setDelayNotified(true);
    setTimeout(() => {
      setShowDelayModal(false);
      setDelayNotified(false);
    }, 2000);
  };

  const handleLogout = () => {
    authService.clearSession();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
          <p className="text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans max-w-2xl mx-auto">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-3 px-4 sticky top-0 z-50 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-lg font-bold text-gray-900 m-0">DocTracker</h1>
            <p className="text-xs text-slate-500 m-0">Doctor App</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-semibold text-sm">
              {user.name?.charAt(0) || 'D'}
            </div>
            <button onClick={handleLogout} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100" aria-label="Logout">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="p-4 pb-8">
        {/* Today's Schedule */}
        <section className="mb-6">
          <h2 className="text-base font-semibold text-gray-900 m-0 mb-3">Today's OPD</h2>
          <div className="space-y-2">
            {schedule.map((slot, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-4 border border-slate-200 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-gray-900 text-sm m-0">{slot.time}</p>
                  <p className="text-slate-500 text-xs m-0">{slot.slot}</p>
                </div>
                {slot.waiting > 0 && (
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">
                    {slot.waiting} waiting
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quick status buttons */}
        <section className="mb-6">
          <h2 className="text-base font-semibold text-gray-900 m-0 mb-3">Quick Status</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {statusOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setStatus(opt.id)}
                className={`flex flex-col items-center justify-center gap-2 py-5 rounded-xl text-white font-semibold text-sm transition-all min-h-[80px] ${opt.color} ${status === opt.id ? 'ring-2 ring-offset-2 ring-gray-900' : ''}`}
              >
                <span className="text-2xl">{opt.icon}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Share Live Location */}
        <section className="bg-white rounded-xl p-5 border border-slate-200 mb-6">
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-base font-semibold text-gray-900 m-0">Share Live Location</h2>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={locationSharing}
                onChange={(e) => handleLocationSharing(e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
          </div>
          <p className="text-slate-500 text-xs leading-relaxed m-0">
            When enabled, patients can see your ETA. Location is shared only while you're on your way and is not stored after your arrival.
          </p>
          {locationSharing && (
            <p className="text-teal-600 text-xs font-medium mt-2 m-0">
              Live: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </p>
          )}
        </section>

        {/* Delay announcement */}
        <section className="mb-6">
          <button
            onClick={() => setShowDelayModal(true)}
            className="w-full py-4 rounded-xl font-semibold border-2 border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors flex items-center justify-center gap-2"
          >
            <span>⏱</span>
            Running late? Notify waiting patients
          </button>
        </section>

        {/* Today's patients (compact) */}
        <section>
          <h2 className="text-base font-semibold text-gray-900 m-0 mb-3">Today's Patients</h2>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            {[
              { name: 'Rahul Kumar', time: '9:15 AM', status: 'waiting' },
              { name: 'Gungun Kumari', time: '10:00 AM', status: 'waiting' },
              { name: 'Raman Kumar', time: '10:30 AM', status: 'upcoming' },
              { name: 'Jane Smith', time: '11:00 AM', status: 'upcoming' },
            ].map((p, i) => (
              <div key={i} className="flex justify-between items-center py-4 px-4 border-b border-slate-100 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900 text-sm m-0">{p.name}</p>
                  <p className="text-slate-500 text-xs m-0">{p.time}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${p.status === 'waiting' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'}`}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Delay announcement modal */}
      {showDelayModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-[200] p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 m-0 mb-2">Notify Patients of Delay</h3>
            <p className="text-slate-500 text-sm m-0 mb-4">
              All waiting patients will receive an update about your revised ETA.
            </p>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Running how many minutes late?</label>
              <select
                value={delayMinutes}
                onChange={(e) => setDelayMinutes(Number(e.target.value))}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-base"
              >
                {[5, 10, 15, 20, 30, 45, 60].map((m) => (
                  <option key={m} value={m}>
                    {m} minutes
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDelayModal(false)}
                className="flex-1 py-3 rounded-xl font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleNotifyDelay}
                disabled={delayNotified}
                className="flex-1 py-3 rounded-xl font-semibold bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-70"
              >
                {delayNotified ? '✓ Notified' : 'Notify All'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
