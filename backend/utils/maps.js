const axios = require('axios');
async function getETAFromGoogleMaps(lat, lng, hospitalAddress) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${lat},${lng}&destination=${encodeURIComponent(hospitalAddress)}&key=${apiKey}`;
  const res = await axios.get(url);
  return res.data.routes[0]?.legs[0]?.duration?.text || 'N/A';
}
module.exports = { getETAFromGoogleMaps }; 