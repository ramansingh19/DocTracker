import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService, { getStoredUser } from "../services/authService";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [showAddDoctorForm, setShowAddDoctorForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    profession: "",
    specialty: "",
  });
  const navigate = useNavigate();

  const handleAddDoctor = () => {
    if (!newDoctor.name || !newDoctor.profession || !newDoctor.specialty) {
      alert("Please fill all fields!");
      return;
    }
    const newEntry = {
      id: doctors.length + 1,
      name: newDoctor.name,
      specialty: newDoctor.specialty,
      department: newDoctor.specialty,
      status: "on_time",
      eta: "5 min",
      waitingPatients: 0,
      nextSlot: "10:30 AM",
    };
    const updated = [...doctors, newEntry];
    setDoctors(updated);
    localStorage.setItem("doctors", JSON.stringify(updated));
    setShowAddDoctorForm(false);
    setNewDoctor({ name: "", profession: "", specialty: "" });
  };

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(storedUser);

    const stored = localStorage.getItem("doctors");
    const data = stored
      ? JSON.parse(stored)
      : [
          {
            id: 1,
            name: "Dr. Aman Kumar",
            department: "Cardiology",
            status: "on_time",
            eta: "5 min",
            waitingPatients: 8,
            nextSlot: "10:30 AM",
          },
          {
            id: 2,
            name: "Dr. John Snow",
            department: "Orthopedics",
            status: "delayed",
            eta: "25 min",
            waitingPatients: 12,
            nextSlot: "11:00 AM",
          },
          {
            id: 3,
            name: "Dr. Nikita Verma",
            department: "Pediatrics",
            status: "in_transit",
            eta: "15 min",
            waitingPatients: 5,
            nextSlot: "10:45 AM",
          },
          {
            id: 4,
            name: "Dr. Ravi Gupta",
            department: "Neurology",
            status: "emergency",
            eta: "N/A",
            waitingPatients: 3,
            nextSlot: "Cancelled",
          },
          {
            id: 5,
            name: "Dr. Priya Sharma",
            department: "General Medicine",
            status: "cancelled",
            eta: "N/A",
            waitingPatients: 0,
            nextSlot: "—",
          },
        ];
    setDoctors(data);
  }, [navigate]);

  const handleLogout = () => {
    authService.clearSession();
    navigate("/login");
  };

  const stats = {
    onTime: doctors.filter(
      (d) =>
        d.status === "on_time" ||
        d.status === "available" ||
        d.status === "consulting",
    ).length,
    delayed: doctors.filter(
      (d) => d.status === "delayed" || d.status === "in_transit",
    ).length,
    cancelled: doctors.filter((d) => d.status === "cancelled").length,
    emergency: doctors.filter((d) => d.status === "emergency").length,
  };

  const getStatusConfig = (status) => {
    const map = {
      on_time: {
        label: "On Time",
        bg: "bg-emerald-100",
        text: "text-emerald-800",
      },
      available: {
        label: "On Time",
        bg: "bg-emerald-100",
        text: "text-emerald-800",
      },
      consulting: {
        label: "Consulting",
        bg: "bg-emerald-100",
        text: "text-emerald-800",
      },
      delayed: { label: "Delayed", bg: "bg-amber-100", text: "text-amber-800" },
      in_transit: {
        label: "In Transit",
        bg: "bg-blue-100",
        text: "text-blue-800",
      },
      cancelled: {
        label: "Cancelled",
        bg: "bg-slate-100",
        text: "text-slate-600",
      },
      emergency: {
        label: "In Emergency",
        bg: "bg-red-100",
        text: "text-red-800",
      },
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

  const handleUpdateStatus = (doctorId, newStatus) => {
  const updatedDoctors = doctors.map((doc) => {
    if (doc.id === doctorId) {
      // Logic for specific status changes
      let extraData = {};
      if (newStatus === 'delayed') extraData = { eta: "30 min", nextSlot: "Delayed" };
      if (newStatus === 'cancelled') extraData = { eta: "N/A", nextSlot: "Cancelled" };
      
      return { ...doc, status: newStatus, ...extraData };
    }
    return doc;
  });

  setDoctors(updatedDoctors);
  localStorage.setItem("doctors", JSON.stringify(updatedDoctors));
  
  // Update the detail panel view
  const updatedSelected = updatedDoctors.find(d => d.id === doctorId);
  setSelectedDoctor(updatedSelected);
};

const handleAddDelay = (doctorId) => {
  // Simple logic: add 15 mins to current ETA or set to delayed
  handleUpdateStatus(doctorId, 'delayed');
};

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Brand Section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-200">
              <div className="w-2 h-5 bg-teal-400 rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-sm font-black text-slate-900 uppercase tracking-tight leading-none">
                DocTracker <span className="text-teal-600">Admin</span>
              </h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Hospital Staff Panel
              </p>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end border-r border-slate-100 pr-4">
              <span className="text-xs font-bold text-slate-700">
                {user.name}
              </span>
              <span className="text-[9px] font-black text-teal-500 uppercase tracking-tighter bg-teal-50 px-1.5 py-0.5 rounded-md">
                Authorized
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="group p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all duration-200 border border-slate-100 hover:border-rose-100 shadow-sm"
              title="Sign Out"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-0.5 transition-transform"
              >
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-8 bg-slate-50/50 min-h-screen">
        {/* Status Tiles */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              key: "onTime",
              label: "On Time",
              value: stats.onTime,
              color: "bg-emerald-500",
              shadow: "shadow-emerald-100",
            },
            {
              key: "delayed",
              label: "Delayed",
              value: stats.delayed,
              color: "bg-amber-500",
              shadow: "shadow-amber-100",
            },
            {
              key: "cancelled",
              label: "Cancelled",
              value: stats.cancelled,
              color: "bg-slate-400",
              shadow: "shadow-slate-100",
            },
            {
              key: "emergency",
              label: "In Emergency",
              value: stats.emergency,
              color: "bg-rose-500",
              shadow: "shadow-rose-100",
            },
          ].map((tile) => (
            <div
              key={tile.key}
              className="bg-white rounded-3xl p-5 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-1.5 h-10 rounded-full ${tile.color} ${tile.shadow} shadow-[0_0_12px_rgba(0,0,0,0.05)]`}
                />
                <div>
                  <p className="text-3xl font-black text-slate-900 tabular-nums leading-none">
                    {tile.value}
                  </p>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                    {tile.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Doctor Table */}
        <section className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4 bg-slate-50/30">
            <div>
              <h2 className="text-lg font-black text-slate-800">
                Doctors Overview
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                Real-time status of clinical personnel
              </p>
            </div>
            <button
              onClick={() => setShowAddDoctorForm(true)}
              className="py-2.5 px-5 rounded-xl font-bold text-sm bg-slate-900 text-white hover:bg-teal-600 transition-all shadow-lg shadow-slate-200 flex items-center gap-2"
            >
              <span className="text-lg leading-none">+</span> Add Doctor
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white border-b border-slate-100 text-[11px] uppercase tracking-widest text-slate-400">
                  <th className="text-left py-4 px-8 font-black">Name</th>
                  <th className="text-left py-4 px-8 font-black">Department</th>
                  <th className="text-left py-4 px-8 font-black">Status</th>
                  <th className="text-left py-4 px-8 font-black text-center">
                    ETA
                  </th>
                  <th className="text-left py-4 px-8 font-black text-center">
                    Waiting
                  </th>
                  <th className="text-left py-4 px-8 font-black">Next Slot</th>
                  <th className="w-10" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {doctors.map((doc) => {
                  const cfg = getStatusConfig(doc.status);
                  const isActive = selectedDoctor?.id === doc.id;
                  return (
                    <tr
                      key={doc.id}
                      onClick={() => setSelectedDoctor(isActive ? null : doc)}
                      className={`group cursor-pointer transition-colors ${isActive ? "bg-teal-50/50" : "hover:bg-slate-50/80"}`}
                    >
                      <td className="py-5 px-8">
                        <p className="font-bold text-slate-800 group-hover:text-teal-700 transition-colors">
                          {doc.name}
                        </p>
                      </td>
                      <td className="py-5 px-8 text-slate-500 font-medium">
                        {doc.department || doc.specialty}
                      </td>
                      <td className="py-5 px-8">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${cfg.bg} ${cfg.text} ring-1 ring-inset ring-black/5`}
                        >
                          <span
                            className={`w-1 h-1 rounded-full ${cfg.text.replace("text-", "bg-")}`}
                          />
                          {cfg.label}
                        </span>
                      </td>
                      <td className="py-5 px-8 text-slate-600 font-bold tabular-nums text-center">
                        {doc.eta}
                      </td>
                      <td className="py-5 px-8 text-center">
                        <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-bold text-xs">
                          {doc.waitingPatients ?? doc.patients ?? 0}
                        </span>
                      </td>
                      <td className="py-5 px-8 text-slate-500 font-medium">
                        {doc.nextSlot}
                      </td>
                      <td className="py-5 px-4">
                        <div
                          className={`transition-transform duration-300 ${isActive ? "rotate-90 text-teal-600" : "text-slate-300 group-hover:translate-x-1"}`}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Doctor Detail Panel */}
        {selectedDoctor && (
          <section className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-xl animate-in slide-in-from-top-4 duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xl font-black">
                    {selectedDoctor.name.charAt(0)}
                  </div>
                  <h2 className="text-2xl font-black tracking-tight">
                    {selectedDoctor.name}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                {[
                  {
                    label: "Department",
                    value:
                      selectedDoctor.department || selectedDoctor.specialty,
                  },
                  {
                    label: "Current Status",
                    value: getStatusConfig(selectedDoctor.status).label,
                    isBadge: true,
                  },
                  {
                    label: "Active Waiting",
                    value:
                      selectedDoctor.waitingPatients ??
                      selectedDoctor.patients ??
                      0,
                  },
                  {
                    label: "Next Scheduled Slot",
                    value: selectedDoctor.nextSlot,
                  },
                ].map((info, idx) => (
                  <div key={idx}>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-400 mb-2">
                      {info.label}
                    </p>
                    {info.isBadge ? (
                      <span
                        className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${getStatusConfig(selectedDoctor.status).bg} ${getStatusConfig(selectedDoctor.status).text}`}
                      >
                        {info.value}
                      </span>
                    ) : (
                      <p className="text-lg font-bold text-slate-100">
                        {info.value}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-widest bg-white/10 hover:bg-rose-500/20 hover:text-rose-400 border border-white/5 transition-all"
                onClick={() => handleUpdateStatus(selectedDoctor.id, 'canceled')}>
                  Mark Cancelled
                </button>
                <button className="py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-widest bg-amber-500 text-slate-900 hover:bg-amber-400 transition-all"
                onClick={() => handleAddDelay(selectedDoctor.id)}>
                  Add Delay
                </button>
                <button className="py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-widest bg-white/10 hover:bg-white/20 border border-white/5 transition-all"
                onClick={() => handleUpdateStatus(selectedDoctor.id, 'on_')}>
                  Update Schedule
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Quick Actions Footer */}
        <section className="flex flex-wrap gap-4 pt-4">
          <button className="group py-4 px-8 rounded-2xl font-black text-xs uppercase tracking-widest border-2 border-slate-200 bg-white text-slate-600 hover:border-slate-900 hover:text-slate-900 transition-all">
            Create Schedule
          </button>
          <button className="group py-4 px-8 rounded-2xl font-black text-xs uppercase tracking-widest border-2 border-slate-200 bg-white text-slate-600 hover:border-slate-900 hover:text-slate-900 transition-all">
            Bulk Reschedule
          </button>
        </section>
      </main>

      {/* Add Doctor modal */}
      {showAddDoctorForm && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4 animate-in fade-in duration-300"
          onClick={() => setShowAddDoctorForm(false)}
        >
          <div
            className="bg-white rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl border border-white/20 animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">🩺</span>
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">
                  Add New Doctor
                </h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Personnel Registration
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <div className="group">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1 group-focus-within:text-teal-600 transition-colors">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Jonathan Smith"
                  value={newDoctor.name}
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, name: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 font-bold placeholder:text-slate-300 focus:bg-white focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
                />
              </div>

              <div className="group">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1 group-focus-within:text-teal-600 transition-colors">
                  Professional Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Senior Surgeon"
                  value={newDoctor.profession}
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, profession: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 font-bold placeholder:text-slate-300 focus:bg-white focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
                />
              </div>

              <div className="group">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1 group-focus-within:text-teal-600 transition-colors">
                  Departmental Specialty
                </label>
                <input
                  type="text"
                  placeholder="e.g. Neurology"
                  value={newDoctor.specialty}
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, specialty: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 font-bold placeholder:text-slate-300 focus:bg-white focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-10">
              <button
                onClick={() => setShowAddDoctorForm(false)}
                className="flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDoctor}
                className="flex-[2] py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-slate-900 text-white hover:bg-teal-600 shadow-lg shadow-slate-200 hover:shadow-teal-200 transition-all active:scale-95"
              >
                Save Personnel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
