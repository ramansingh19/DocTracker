-- users table schema for PostgreSQL
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('doctor', 'admin')),
  status VARCHAR(50) DEFAULT 'available',
  last_lat DECIMAL(10, 8),
  last_lng DECIMAL(11, 8),
  last_eta VARCHAR(100),
  location_sharing_enabled BOOLEAN DEFAULT false,
  push_token TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- location_history table for tracking doctor movements
CREATE TABLE location_history (
  id SERIAL PRIMARY KEY,
  doctor_id INTEGER REFERENCES users(id),
  lat DECIMAL(10, 8) NOT NULL,
  lng DECIMAL(11, 8) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Environment variables needed (.env file):
-- DATABASE_URL=postgresql://username:password@localhost:5432/doctracker
-- JWT_SECRET=your-super-secret-jwt-key
-- GOOGLE_MAPS_API_KEY=your-google-maps-api-key (optional)
-- HOSPITAL_ADDRESS=123 Hospital Street, City, State 12345 