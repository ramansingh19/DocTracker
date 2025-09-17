# DocTracker Setup Guide

## Quick Fix for "Failed to Fetch" Error

The main issues causing the "failed to fetch" error have been fixed:

### 1. Fixed Issues:
- ✅ Replaced all `YOUR_BACKEND_URL` placeholders with `localhost:5001`
- ✅ Added missing doctor routes to backend
- ✅ Added missing `/api/forgot-password` endpoint
- ✅ Added missing `/api/doctors` endpoint for admin interface
- ✅ Improved CORS configuration

### 2. Backend Setup:

1. **Install Dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Create .env file in backend folder:**
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/doctracker
   JWT_SECRET=your-super-secret-jwt-key-change-this
   GOOGLE_MAPS_API_KEY=your-google-maps-api-key
   HOSPITAL_ADDRESS=123 Hospital Street, City, State 12345
   ```

3. **Setup PostgreSQL Database:**
   - Install PostgreSQL
   - Create database: `doctracker`
   - Run the SQL from `backend/models/README.txt` to create tables

4. **Start Backend Server:**
   ```bash
   cd backend
   npm start
   ```
   Server will run on http://localhost:5001

### 3. Frontend Setup:

1. **For Landing Pages:**
   - Open `landing/index.html` in browser
   - All URLs are now fixed to use localhost:5001

2. **For React Native App:**
   ```bash
   cd frontend
   npm install
   npx expo start
   ```

### 4. Testing the Fix:

1. **Start the backend server first**
2. **Open landing page** - should work without "failed to fetch"
3. **Test signup/login** - should work properly
4. **Test admin interface** - should load doctor list

### 5. For Class Demonstration:

1. Make sure PostgreSQL is running
2. Start backend: `cd backend && npm start`
3. Open `landing/index.html` in browser
4. Create a test account (doctor or admin)
5. Login should work without errors

## Common Issues & Solutions:

- **"Failed to fetch"**: Backend not running or wrong URL
- **Database connection error**: Check DATABASE_URL in .env
- **CORS error**: Backend CORS is configured for common ports
- **JWT error**: Make sure JWT_SECRET is set in .env

## Database Schema:
The updated schema includes all necessary columns for the application to work properly. See `backend/models/README.txt` for the complete SQL.
