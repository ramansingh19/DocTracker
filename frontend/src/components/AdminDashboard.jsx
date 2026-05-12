import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService, { getStoredUser } from "../services/authService";
import apiClient from "../services/apiClient";
import { getEtaLabel, getStatusMeta } from "../utils/statusConfig";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [showAddDoctorForm, setShowAddDoctorForm] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    email: "",
    password: "",
    specialty: "",
  });
  const navigate = useNavigate();

  const loadDashboardData = async () => {
    const [doctorRes, userRes] = await Promise.all([
      apiClient.get("/doctors"),
      apiClient.get("/users"),
    ]);
    setDoctors(doctorRes.doctors || []);
    setUsers(userRes.users || []);
  };

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      navigate("/login");
      return;
    }
    if (storedUser.role !== "admin") {
      navigate("/login");
      return;
    }
    setUser(storedUser);
    loadDashboardData()
      .catch((error) => setNotice(error.message))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    authService.clearSession();
    navigate("/login");
  };

  const stats = {
    onTime: doctors.filter((d) => d.status === "arrived" || d.status === "consulting").length,
    delayed: doctors.filter((d) => d.status === "delayed" || d.status === "in_transit").length,
    inOt: doctors.filter((d) => d.status === "in_ot").length,
    total: doctors.length,
  };

  const getStatusConfig = (status) => {
    const meta = getStatusMeta(status);
    const toneMap = {
      success: { bg: "bg-emerald-100", text: "text-emerald-800" },
      warning: { bg: "bg-amber-100", text: "text-amber-800" },
      info: { bg: "bg-blue-100", text: "text-blue-800" },
      muted: { bg: "bg-slate-100", text: "text-slate-700" },
    };
    return { label: meta.label, ...(toneMap[meta.tone] || toneMap.muted) };
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

  const handleUpdateStatus = async (doctorId, newStatus) => {
    try {
      await apiClient.patch(`/doctors/${doctorId}/status`, { status: newStatus });
      await loadDashboardData();
    } catch (error) {
      setNotice(error.message);
    }
  };

  const handleAddDelay = async (doctorId, currentEtaMinutes = 15) => {
    try {
      await apiClient.patch(`/doctors/${doctorId}/status`, { status: "delayed" });
      await apiClient.patch(`/doctors/${doctorId}/eta`, { currentEtaMinutes: currentEtaMinutes + 15 });
      await loadDashboardData();
    } catch (error) {
      setNotice(error.message);
    }
  };

  const handleAddDoctor = async () => {
    if (!newDoctor.name || !newDoctor.email || !newDoctor.password || !newDoctor.specialty) {
      setNotice("Please fill all fields.");
      return;
    }
    try {
      const registerRes = await apiClient.post(
        "/auth/register",
        {
          name: newDoctor.name,
          email: newDoctor.email,
          password: newDoctor.password,
          role: "doctor",
        },
        { auth: false }
      );
      await apiClient.post("/doctors", {
        userId: registerRes.user.id || registerRes.user._id,
        department: newDoctor.specialty,
      });
      setShowAddDoctorForm(false);
      setNewDoctor({ name: "", email: "", password: "", specialty: "" });
      await loadDashboardData();
    } catch (error) {
      setNotice(error.message);
    }
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 sm:space-y-8 bg-slate-50/50 min-h-screen">
        {notice && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 text-amber-800 text-sm font-semibold px-4 py-3">
            {notice}
          </div>
        )}
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
              key: "inOt",
              label: "In OT",
              value: stats.inOt,
              color: "bg-violet-500",
              shadow: "shadow-violet-100",
            },
            {
              key: "total",
              label: "Total",
              value: stats.total,
              color: "bg-slate-600",
              shadow: "shadow-slate-100",
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
        <section className="bg-white rounded-2xl sm:rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-4 sm:px-8 py-5 sm:py-6 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4 bg-slate-50/30">
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
              className="min-h-11 py-2.5 px-5 rounded-xl font-bold text-sm bg-slate-900 text-white hover:bg-teal-600 transition-all shadow-lg shadow-slate-200 flex items-center gap-2"
            >
              <span className="text-lg leading-none">+</span> Add Doctor
            </button>
          </div>

          <div className="md:hidden p-4 space-y-3">
            {!loading && doctors.map((doc) => {
              const cfg = getStatusConfig(doc.status);
              const doctorName = doc.userId?.name || "Doctor";
              return (
                <div key={doc._id} className="rounded-xl border border-slate-200 p-4 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-bold text-slate-800">{doctorName}</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-black uppercase ${cfg.bg} ${cfg.text}`}>
                      {cfg.label}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">Dept: {doc.department}</p>
                  <p className="text-sm text-slate-600">ETA: {getEtaLabel(doc.currentEtaMinutes)}</p>
                  <div className="flex gap-2">
                    <button onClick={() => handleUpdateStatus(doc._id, "arrived")} className="min-h-10 px-3 rounded bg-emerald-100 text-emerald-700 text-xs font-bold">Arrived</button>
                    <button onClick={() => handleAddDelay(doc._id, doc.currentEtaMinutes ?? 15)} className="min-h-10 px-3 rounded bg-amber-100 text-amber-700 text-xs font-bold">Delay</button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="overflow-x-auto hidden md:block">
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
                {!loading && doctors.map((doc) => {
                  const cfg = getStatusConfig(doc.status);
                  const doctorName = doc.userId?.name || "Doctor";
                  return (
                    <tr key={doc._id} className="group transition-colors hover:bg-slate-50/80">
                      <td className="py-5 px-8">
                        <p className="font-bold text-slate-800 group-hover:text-teal-700 transition-colors">
                          {doctorName}
                        </p>
                      </td>
                      <td className="py-5 px-8 text-slate-500 font-medium">
                        {doc.department}
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
                        {getEtaLabel(doc.currentEtaMinutes)}
                      </td>
                      <td className="py-5 px-8 text-center">
                        <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-bold text-xs">
                          {doc.waitingPatients ?? 0}
                        </span>
                      </td>
                      <td className="py-5 px-8 text-slate-500 font-medium">
                        {doc.nextSlot || "Not set"}
                      </td>
                      <td className="py-5 px-4">
                        <div className="flex gap-2">
                          <button onClick={() => handleUpdateStatus(doc._id, "arrived")} className="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-700">Arrived</button>
                          <button onClick={() => handleAddDelay(doc._id, doc.currentEtaMinutes ?? 15)} className="text-xs px-2 py-1 rounded bg-amber-100 text-amber-700">Delay</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {!loading && doctors.length === 0 && (
                  <tr>
                    <td colSpan="7" className="py-6 text-center text-slate-500">No doctors found. Add a doctor to start tracking.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
        <section className="bg-white rounded-3xl p-5 border border-slate-200">
          <h3 className="font-bold text-slate-700 mb-2">Doctor Users</h3>
          <p className="text-sm text-slate-500">
            Registered doctor accounts: {users.filter((u) => u.role === "doctor").length}
          </p>
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
                  Email
                </label>
                <input
                  type="email"
                  placeholder="doctor@example.com"
                  value={newDoctor.email}
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, email: e.target.value })
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

              <div className="group">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1 group-focus-within:text-teal-600 transition-colors">
                  Initial Password
                </label>
                <input
                  type="password"
                  placeholder="minimum 8 characters"
                  value={newDoctor.password}
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, password: e.target.value })
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
