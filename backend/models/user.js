const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

module.exports = {
  async findByEmail(email) {
    const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return res.rows[0];
  },
  async createUser({ email, passwordHash, role }) {
    const res = await pool.query(
      'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *',
      [email, passwordHash, role]
    );
    return res.rows[0];
  },
  async findById(id) {
    const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return res.rows[0];
  },
  async savePushToken(userId, pushToken) {
    await pool.query('UPDATE users SET push_token = $1 WHERE id = $2', [pushToken, userId]);
  }
}; 