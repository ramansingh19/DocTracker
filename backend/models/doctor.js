const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

module.exports = {
  async saveLocation(doctorId, lat, lng) {
    await pool.query(
      'INSERT INTO location_history (doctor_id, lat, lng) VALUES ($1, $2, $3)',
      [doctorId, lat, lng]
    );
    await pool.query(
      'UPDATE users SET last_lat = $1, last_lng = $2 WHERE id = $3',
      [lat, lng, doctorId]
    );
  },
  async updateStatus(doctorId, status) {
    await pool.query('UPDATE users SET status = $1 WHERE id = $2', [status, doctorId]);
  },
  async updateETA(doctorId, eta) {
    await pool.query('UPDATE users SET last_eta = $1 WHERE id = $2', [eta, doctorId]);
  },
  async setLocationSharing(doctorId, enabled) {
    await pool.query('UPDATE users SET location_sharing_enabled = $1 WHERE id = $2', [enabled, doctorId]);
  },
  async getDoctor(doctorId) {
    const res = await pool.query('SELECT * FROM users WHERE id = $1', [doctorId]);
    return res.rows[0];
  }
}; 