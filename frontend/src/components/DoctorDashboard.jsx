import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import authService, { getStoredUser } from "../services/authService";
import { getStatusMeta } from "../utils/statusConfig";

const DoctorDashboard = () => {
  const [user, setUser] = useState(null);
  const [modalError, setModalError] = useState("");
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [status, setStatus] = useState("in_transit");
  const [locationSharing, setLocationSharing] = useState(false);
  const [showDelayModal, setShowDelayModal] = useState(false);
  const [delayMinutes, setDelayMinutes] = useState(15);
  const [delayNotified, setDelayNotified] = useState(false);
  const [broadcastingDelay, setBroadcastingDelay] = useState(false);
  const [location, setLocation] = useState({ lat: 28.6139, lng: 77.209 });
  const [queueTotal, setQueueTotal] = useState(0);
  const [notice, setNotice] = useState("");
  const locationWatchId = useRef(null);
  const navigate = useNavigate();

  const statusOptions = [
    { id: "in_transit", label: "Transit", icon: "🚗", color: "bg-blue-600" },
    { id: "consulting", label: "Consulting", icon: "🩺", color: "bg-teal-600" },
    { id: "in_ot", label: "In OT", icon: "🏥", color: "bg-indigo-600" },
    { id: "arrived", label: "Arrived", icon: "✅", color: "bg-emerald-600" },
    { id: "delayed", label: "Delayed", icon: "⏱", color: "bg-amber-500" },
  ];

  const loadDoctorData = async (userId) => {
    const doctorsResponse = await apiClient.get("/doctors");
    const doctors = doctorsResponse.doctors || [];
    const profile = doctors.find(
      (doctor) => (doctor.userId?._id || doctor.userId?.id) === userId,
    );
    if (!profile) {
      throw new Error(
        "Doctor profile not found. Ask admin to create your doctor profile.",
      );
    }
    setDoctorProfile(profile);
    setStatus(profile.status);

    const queueResponse = await apiClient.get(`/queue/${profile._id}`);
    setQueueTotal(queueResponse.totalInQueue || 0);
  };

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(storedUser);
    loadDoctorData(storedUser.id).catch((error) => setNotice(error.message));
  }, [navigate]);

  useEffect(() => {
    if (!doctorProfile?._id) {
      return;
    }
    const interval = setInterval(() => {
      apiClient
        .get(`/queue/${doctorProfile._id}`)
        .then((data) => setQueueTotal(data.totalInQueue || 0))
        .catch((error) => {
          console.error("Doctor queue polling failed", {
            doctorId: doctorProfile._id,
            message: error?.message,
          });
        });
    }, 20000);
    return () => clearInterval(interval);
  }, [doctorProfile?._id]);

  useEffect(() => {
    return () => {
      if (locationWatchId.current !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(locationWatchId.current);
      }
    };
  }, []);

  const updateDoctorLocation = async (nextLocation, enabled) => {
    if (!doctorProfile?._id) {
      return;
    }
    const response = await apiClient.patch(
      `/doctors/${doctorProfile._id}/location`,
      {
        lat: nextLocation.lat,
        lng: nextLocation.lng,
        isTrackingEnabled: enabled,
      },
    );
    if (response.doctor) {
      setDoctorProfile(response.doctor);
    }
  };

  const handleLocationSharing = async (enabled) => {
    setLocationSharing(enabled);
    setNotice("");

    if (locationWatchId.current !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(locationWatchId.current);
      locationWatchId.current = null;
    }

    if (!enabled) {
      try {
        await updateDoctorLocation(location, false);
      } catch (error) {
        setNotice(error.message || "Unable to disable location sharing.");
      }
      return;
    }

    if (!navigator.geolocation) {
      setLocationSharing(false);
      setNotice("Location sharing is not supported by this browser.");
      return;
    }

    locationWatchId.current = navigator.geolocation.watchPosition(
      async (pos) => {
        const nextLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setLocation(nextLocation);
        try {
          await updateDoctorLocation(nextLocation, true);
        } catch (error) {
          setNotice(error.message || "Unable to update live location.");
        }
      },
      (error) => {
        setLocationSharing(false);
        setNotice(error.message || "Unable to access your location.");
      },
      { enableHighAccuracy: true },
    );
  };

  const handleNotifyDelay = async () => {
    if (!doctorProfile?._id || broadcastingDelay) return;

    setBroadcastingDelay(true);
    setModalError("");
    setNotice("");

    try {
      await Promise.all([
        apiClient.patch(`/doctors/${doctorProfile._id}/status`, {
          status: "delayed",
        }),
        apiClient.patch(`/doctors/${doctorProfile._id}/eta`, {
          currentEtaMinutes: delayMinutes,
        }),
      ]);
    } catch (err) {
      console.warn("Status/ETA update failed:", err.message);
      console.error("Doctor delay status update error", {
        doctorId: doctorProfile._id,
        delayMinutes,
        message: err?.message,
      });
      setModalError(
        err.message || "Could not update status/ETA. Please try again.",
      );
      setBroadcastingDelay(false);
      return;
    }

    try {
      await apiClient.post("/notifications/broadcast", {
        type: "delay",
        title: "Doctor Delay Update",
        message: `Doctor is delayed by approximately ${delayMinutes} minutes.`,
        roleTarget: "patient",
        meta: { doctorId: doctorProfile._id, delayMinutes },
      });
    } catch (err) {
      console.warn("Notification broadcast failed:", err.message);
      console.error("Doctor delay broadcast error", {
        doctorId: doctorProfile._id,
        delayMinutes,
        message: err?.message,
      });
      setModalError(
        err.message || "Could not send broadcast update. Please try again.",
      );
      setBroadcastingDelay(false);
      return;
    }

    setDelayNotified(true);
    setStatus("delayed");
    setNotice(`Broadcast update sent successfully (${delayMinutes} min delay).`);
    window.alert("Broadcast update sent successfully.");

    setTimeout(() => {
      setShowDelayModal(false);
      setDelayNotified(false);
      setBroadcastingDelay(false);
    }, 2000);
  };

  const handleLogout = () => {
    authService.clearSession();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F6F8FB] font-sans">
      {/* ===== CONTAINER ===== */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {notice && (
          <div className="pt-4">
            <div className="rounded-xl border border-amber-200 bg-amber-50 text-amber-800 text-sm font-semibold px-4 py-3">
              {notice}
            </div>
          </div>
        )}
        {/* ===== HEADER ===== */}
        <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-200/60 px-8 py-4 rounded-b-4xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Brand */}
            <div className="group cursor-default">
              <h1 className="text-xl font-black tracking-tight flex items-center gap-2.5 text-slate-800">
                <span className="w-1.5 h-6 bg-teal-500 rounded-full shadow-[0_0_12px_rgba(20,184,166,0.4)] group-hover:scale-y-110 transition-transform duration-300" />
                DOCTRACKER
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="flex h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em]">
                  Live Console
                </p>
              </div>
            </div>

            {/* User */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right pr-4 border-r border-slate-100">
                <p className="text-sm font-extrabold text-slate-700 leading-none">
                  Dr. {user.name?.split(" ")[0] || "Doctor"}
                </p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-teal-600 mt-1 bg-teal-50 px-2 py-0.5 rounded-full inline-block">
                  {getStatusMeta(status).label}
                </p>
              </div>

              <div className="flex items-center gap-3 bg-slate-50/50 p-1 rounded-2xl border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white text-sm font-bold shadow-md ring-2 ring-white">
                  {user.name?.charAt(0) || "D"}
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center w-11 h-11 rounded-xl bg-white text-slate-400 border border-slate-100 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 shadow-sm transition-all duration-200"
                  title="Logout"
                >
                  <span className="text-lg leading-none mt-[-2px]">⎋</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* ===== MAIN GRID ===== */}
        <main className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto px-2 sm:px-4">
          {/* ===== STATUS ===== */}
          <section className="bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-4 bg-teal-500 rounded-full" />
              <h2 className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em]">
                Current Availability
              </h2>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {statusOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={async () => {
                    setNotice("");
                    setStatus(opt.id);
                    if (doctorProfile?._id) {
                      try {
                        const response = await apiClient.patch(
                          `/doctors/${doctorProfile._id}/status`,
                          { status: opt.id },
                        );
                        setDoctorProfile(response.doctor || doctorProfile);
                      } catch (error) {
                        setStatus(doctorProfile.status);
                        setNotice(
                          error.message || "Unable to update doctor status.",
                        );
                      }
                    }
                  }}
                  className={`min-h-11 px-5 sm:px-6 py-3 sm:py-4 rounded-2xl font-bold flex items-center gap-3 transition-all duration-300 whitespace-nowrap border-2
          ${
            status === opt.id
              ? `${opt.color} text-white shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)] border-transparent scale-[1.02]`
              : "bg-white text-slate-500 border-slate-50 hover:border-slate-200 hover:bg-slate-50"
          }`}
                >
                  <span
                    className={`text-xl ${status === opt.id ? "brightness-110" : "grayscale opacity-70"}`}
                  >
                    {opt.icon}
                  </span>
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          {/* ===== LIVE OPS ===== */}
          <section className="bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-4 bg-teal-500 rounded-full" />
                <h2 className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em]">
                  Live Operations
                </h2>
              </div>
              <span className="flex items-center gap-2 text-[10px] font-black text-teal-600 bg-teal-50 px-3 py-1.5 rounded-xl ring-1 ring-teal-100">
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse" />
                SYSTEM ONLINE
              </span>
            </div>

            <div className="space-y-3">
              <div className="group bg-slate-50/50 p-5 rounded-2xl flex justify-between items-center border border-transparent hover:border-slate-200 hover:bg-white hover:shadow-md transition-all duration-300">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Department
                  </p>
                  <p className="text-sm font-black text-slate-700 mt-1">
                    {doctorProfile?.department || "Not set"}
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-xl border border-amber-100 shadow-sm">
                  <span className="text-sm font-black">{queueTotal}</span>
                  <span className="text-[10px] font-bold uppercase tracking-tighter">
                    Waiting
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ===== TRACKING ===== */}
          <section className="lg:col-span-2 relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -mr-20 -mt-20" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight mb-2">
                  ETA Broadcasting
                </h2>
                <p className="text-slate-400 text-sm max-w-md">
                  Real-time location sharing allows patients to see your
                  estimated arrival and reduces inquiry calls.
                </p>
              </div>

              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10 backdrop-blur-sm">
                <span
                  className={`text-xs font-bold uppercase tracking-widest ${locationSharing ? "text-teal-400" : "text-slate-500"}`}
                >
                  {locationSharing ? "Active" : "Disabled"}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={locationSharing}
                    onChange={(e) => handleLocationSharing(e.target.checked)}
                  />
                  <div className="w-14 h-7 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-6 after:transition-all peer-checked:bg-teal-500"></div>
                </label>
              </div>
            </div>

            <div className="mt-8 relative z-10">
              {locationSharing ? (
                <div className="inline-flex items-center gap-3 bg-teal-500/10 border border-teal-500/20 px-6 py-4 rounded-2xl">
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-ping" />
                  <code className="text-teal-100 font-mono font-bold tracking-wider">
                    {location.lat.toFixed(4)}°N , {location.lng.toFixed(4)}°E
                  </code>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-slate-500 bg-slate-800/50 w-fit px-6 py-4 rounded-2xl italic">
                  Location broadcast is currently offline
                </div>
              )}
            </div>
          </section>

          {/* ===== DELAY BUTTON ===== */}
          <button
            onClick={() => setShowDelayModal(true)}
            className="lg:col-span-2 group relative overflow-hidden py-6 rounded-[2rem] bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all duration-500 shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex items-center justify-center gap-3 text-white">
              <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">
                ⏱
              </span>
              <span className="font-black uppercase tracking-[0.2em] text-sm">
                Announce Schedule Delay
              </span>
            </div>
          </button>
        </main>

        {/* ===== MODAL ===== */}
        {showDelayModal && (
          <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 transition-all duration-300">
            <div className="bg-white w-full max-w-xl rounded-[2.5rem] p-8 shadow-2xl border border-white/20 animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 ease-out">
              {/* Header with Success Icon Transition */}
              <div className="flex flex-col items-center mb-8">
                <div className="w-12 h-1.5 bg-slate-100 rounded-full mb-6 sm:hidden" />
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 rotate-0 ${delayNotified ? "bg-teal-500 rotate-[360deg]" : "bg-amber-50"}`}
                >
                  {delayNotified ? (
                    <span className="text-3xl text-white">✓</span>
                  ) : (
                    <span className="text-3xl">⏱</span>
                  )}
                </div>
                <h3 className="text-2xl font-black text-slate-800">
                  {delayNotified ? "Update Sent" : "Delay Notification"}
                </h3>
                <p className="text-slate-400 text-sm font-medium mt-1">
                  {delayNotified
                    ? "Patients have been notified of the schedule change."
                    : "Select time to update patient expectations"}
                </p>
              </div>

              {/* Grid Selection */}
              <div className="grid grid-cols-4 gap-3 mb-10">
                {[15, 30, 45, 60].map((m) => (
                  <button
                    key={m}
                    disabled={delayNotified || broadcastingDelay}
                    onClick={() => setDelayMinutes(m)}
                    className={`relative py-5 rounded-2xl font-black transition-all duration-200 
            ${
              delayMinutes === m
                ? "bg-slate-900 text-white shadow-xl scale-[1.05] ring-4 ring-slate-900/10"
                : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-transparent"
            } ${(delayNotified || broadcastingDelay) && "opacity-40 grayscale"}`}
                  >
                    <span className="text-lg">{m}</span>
                    <span className="text-[10px] block opacity-60 uppercase tracking-tighter">
                      min
                    </span>
                  </button>
                ))}
              </div>

              {/* Inside the modal, just above the <div className="flex gap-3"> action buttons */}
              {modalError && (
                <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-sm font-semibold px-4 py-3 text-center">
                  {modalError}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDelayModal(false);
                    setDelayNotified(false);
                    setModalError("");
                  }}
                  disabled={broadcastingDelay}
                  className="flex-1 py-4 px-6 rounded-2xl text-slate-500 font-bold hover:bg-slate-50 transition-colors"
                >
                  {delayNotified ? "Close" : "Cancel"}
                </button>

                {!delayNotified && (
                  // ── Fix the Broadcast button — bg-linear-to-r → bg-gradient-to-r ──────
                  <button
                    onClick={handleNotifyDelay}
                    disabled={!delayMinutes || broadcastingDelay}
                    className={`flex-[2.5] py-4 px-6 rounded-2xl font-black tracking-wide shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 bg-linear-to-r from-teal-600 to-teal-500 text-white ${
                      (!delayMinutes || broadcastingDelay) &&
                      "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    {broadcastingDelay ? "Broadcasting..." : "Broadcast Update"}
                  </button>
                )}

                {delayNotified && (
                  <div className="flex-[2.5] py-4 px-6 rounded-2xl font-black tracking-wide bg-teal-500 text-white flex items-center justify-center gap-2 animate-in fade-in zoom-in-90 duration-300">
                    DONE
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
