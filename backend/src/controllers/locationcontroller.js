// import Doctor from "../models/Doctor.js";

export const updateLocation = async (req, res) => {
  try {
    const doctorId = req.user.id; // extracted from JWT
    const { lat, lng, sharing } = req.body;

    if (!sharing) {
      // stop sharing location
      await Doctor.findByIdAndUpdate(doctorId, {
        locationSharing: false,
        location: null,
        lastUpdated: null
      });

      return res.json({ message: "Location sharing stopped." });
    }

    // update location
    await Doctor.findByIdAndUpdate(doctorId, {
      locationSharing: true,
      location: { lat, lng },
      lastUpdated: new Date()
    });

    res.json({ message: "Location updated." });
  } catch (error) {
    console.error("Location update failed:", error);
    res.status(500).json({ message: "Server error" });
  }
};
