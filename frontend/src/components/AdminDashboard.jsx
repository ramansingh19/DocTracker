import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService, { getStoredUser } from '../services/authService';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [showAddDoctorForm, setShowAddDoctorForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [newDoctor, setNewDoctor] = useState({ name: '', profession: '', specialty: '' });
  const navigate = useNavigate();

  const handleAddDoctor = () => {
    if (!newDoctor.name || !newDoctor.profession || !newDoctor.specialty) {
      alert('Please fill all fields!');
      return;
    }
    const newEntry = {
      id: doctors.length + 1,
      name: newDoctor.name,
      specialty: newDoctor.specialty,
      department: newDoctor.specialty,
      status: 'on_time',
      eta: '5 min',
      waitingPatients: 0,
      nextSlot: '10:30 AM',
    };
    const updated = [...doctors, newEntry];
    setDoctors(updated);
    localStorage.setItem('doctors', JSON.stringify(updated));
    setShowAddDoctorForm(false);
    setNewDoctor({ name: '', profession: '', specialty: '' });
  };

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(storedUser);

    const stored = localStorage.getItem('doctors');
    const data = stored ? JSON.parse(stored) : [
      { id: 1, name: 'Dr. Aman Kumar', department: 'Cardiology', status: 'on_time', eta: '5 min', waitingPatients: 8, nextSlot: '10:30 AM' },
      { id: 2, name: 'Dr. John Snow', department: 'Orthopedics', status: 'delayed', eta: '25 min', waitingPatients: 12, nextSlot: '11:00 AM' },
      { id: 3, name: 'Dr. Nikita Verma', department: 'Pediatrics', status: 'in_transit', eta: '15 min', waitingPatients: 5, nextSlot: '10:45 AM' },
      { id: 4, name: 'Dr. Ravi Gupta', department: 'Neurology', status: 'emergency', eta: 'N/A', waitingPatients: 3, nextSlot: 'Cancelled' },
      { id: 5, name: 'Dr. Priya Sharma', department: 'General Medicine', status: 'cancelled', eta: 'N/A', waitingPatients: 0, nextSlot: '—' },
    ];
    setDoctors(data);
  }, [navigate]);

  const handleLogout = () => {
    authService.clearSession();
    navigate('/login');
  };

  const stats = {
    onTime: doctors.filter((d) => d.status === 'on_time' || d.status === 'available' || d.status === 'consulting').length,
    delayed: doctors.filter((d) => d.status === 'delayed' || d.status === 'in_transit').length,
    cancelled: doctors.filter((d) => d.status === 'cancelled').length,
    emergency: doctors.filter((d) => d.status === 'emergency').length,
  };

  const getStatusConfig = (status) => {
    const map = {
      on_time: { label: 'On Time', bg: 'bg-emerald-100', text: 'text-emerald-800' },
      available: { label: 'On Time', bg: 'bg-emerald-100', text: 'text-emerald-800' },
      consulting: { label: 'Consulting', bg: 'bg-emerald-100', text: 'text-emerald-800' },
      delayed: { label: 'Delayed', bg: 'bg-amber-100', text: 'text-amber-800' },
      in_transit: { label: 'In Transit', bg: 'bg-blue-100', text: 'text-blue-800' },
      cancelled: { label: 'Cancelled', bg: 'bg-slate-100', text: 'text-slate-600' },
      emergency: { label: 'In Emergency', bg: 'bg-red-100', text: 'text-red-800' },
    };
    return map[status] || map.cancelled;
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
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-lg font-bold text-gray-900 m-0">DocTracker Admin</h1>
            <p className="text-xs text-slate-500 m-0">Hospital Staff Panel</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600 hidden sm:inline">{user.name}</span>
            <button onClick={handleLogout} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Status tiles */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {[
            { key: 'onTime', label: 'On Time', value: stats.onTime, color: 'bg-emerald-500', bg: 'bg-white', border: 'border-slate-200' },
            { key: 'delayed', label: 'Delayed', value: stats.delayed, color: 'bg-amber-500', bg: 'bg-white', border: 'border-slate-200' },
            { key: 'cancelled', label: 'Cancelled', value: stats.cancelled, color: 'bg-slate-400', bg: 'bg-white', border: 'border-slate-200' },
            { key: 'emergency', label: 'In Emergency', value: stats.emergency, color: 'bg-red-500', bg: 'bg-white', border: 'border-slate-200' },
          ].map((tile) => (
            <div key={tile.key} className={`${tile.bg} rounded-xl p-4 border ${tile.border} shadow-sm`}>
              <div className="flex items-center gap-3">
                <div className={`w-2 h-8 rounded-full ${tile.color}`} />
                <div>
                  <p className="text-2xl font-bold text-gray-900 tabular-nums m-0">{tile.value}</p>
                  <p className="text-sm text-slate-500 m-0">{tile.label}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Doctor table */}
        <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
          <div className="px-4 sm:px-6 py-4 border-b border-slate-200 flex flex-wrap justify-between items-center gap-4">
            <h2 className="text-base font-semibold text-gray-900 m-0">Doctors Overview</h2>
            <button
              onClick={() => setShowAddDoctorForm(true)}
              className="py-2 px-4 rounded-lg font-semibold text-sm bg-teal-600 text-white hover:bg-teal-700"
            >
              + Add Doctor
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Department</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">ETA</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Waiting</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Next Slot</th>
                  <th className="w-10" />
                </tr>
              </thead>
              <tbody>
                {doctors.map((doc) => {
                  const cfg = getStatusConfig(doc.status);
                  return (
                    <tr
                      key={doc.id}
                      className="border-b border-slate-100 hover:bg-slate-50/50 cursor-pointer"
                      onClick={() => setSelectedDoctor(selectedDoctor?.id === doc.id ? null : doc)}
                    >
                      <td className="py-4 px-4 font-medium text-gray-900">{doc.name}</td>
                      <td className="py-4 px-4 text-slate-600">{doc.department || doc.specialty}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
                          {cfg.label}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-600 tabular-nums">{doc.eta}</td>
                      <td className="py-4 px-4 text-slate-600 tabular-nums">{doc.waitingPatients ?? doc.patients ?? 0}</td>
                      <td className="py-4 px-4 text-slate-600">{doc.nextSlot}</td>
                      <td className="py-4 px-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Doctor detail panel */}
        {selectedDoctor && (
          <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold text-gray-900 m-0">{selectedDoctor.name}</h2>
              <button onClick={() => setSelectedDoctor(null)} className="text-slate-500 hover:text-slate-700">
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-xs text-slate-500 m-0">Department</p>
                <p className="font-medium text-gray-900 m-0">{selectedDoctor.department || selectedDoctor.specialty}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 m-0">Status</p>
                <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold ${getStatusConfig(selectedDoctor.status).bg} ${getStatusConfig(selectedDoctor.status).text}`}>
                  {getStatusConfig(selectedDoctor.status).label}
                </span>
              </div>
              <div>
                <p className="text-xs text-slate-500 m-0">Waiting</p>
                <p className="font-medium text-gray-900 m-0">{selectedDoctor.waitingPatients ?? selectedDoctor.patients ?? 0}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 m-0">Next Slot</p>
                <p className="font-medium text-gray-900 m-0">{selectedDoctor.nextSlot}</p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button className="py-2 px-4 rounded-lg font-medium text-sm border border-slate-200 text-slate-600 hover:bg-slate-50">
                Mark Cancelled
              </button>
              <button className="py-2 px-4 rounded-lg font-medium text-sm border border-amber-200 text-amber-700 hover:bg-amber-50">
                Add Delay
              </button>
              <button className="py-2 px-4 rounded-lg font-medium text-sm border border-slate-200 text-slate-600 hover:bg-slate-50">
                Update Schedule
              </button>
            </div>
          </section>
        )}

        {/* Quick actions */}
        <section className="flex flex-wrap gap-3">
          <button className="py-3 px-5 rounded-xl font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
            Create Schedule
          </button>
          <button className="py-3 px-5 rounded-xl font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
            Mark Reschedules
          </button>
        </section>
      </main>

      {/* Add Doctor modal */}
      {showAddDoctorForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200] p-4" onClick={() => setShowAddDoctorForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Add New Doctor</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Dr. Full Name"
                  value={newDoctor.name}
                  onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profession</label>
                <input
                  type="text"
                  placeholder="e.g. Physician"
                  value={newDoctor.profession}
                  onChange={(e) => setNewDoctor({ ...newDoctor, profession: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department / Specialty</label>
                <input
                  type="text"
                  placeholder="e.g. Cardiology"
                  value={newDoctor.specialty}
                  onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddDoctorForm(false)} className="flex-1 py-3 rounded-xl font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50">
                Cancel
              </button>
              <button onClick={handleAddDoctor} className="flex-1 py-3 rounded-xl font-semibold bg-teal-600 text-white hover:bg-teal-700">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
