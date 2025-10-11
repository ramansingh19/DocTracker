# DocTracker - React Frontend Only

## Overview
DocTracker is now a pure React application for demonstrating doctor arrival tracking and queue management. No backend required!

## Features
- **Landing Page**: Beautiful homepage with features overview
- **Authentication**: Login/Signup with mock authentication
- **Doctor Dashboard**: Real-time status updates and patient management
- **Patient Status**: Live queue position and doctor ETA tracking
- **Admin Dashboard**: Complete system overview and management

## Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start the Application
```bash
npm start
```

The app will open at `http://localhost:3000`

## Demo Credentials

### Login Page
- **Doctor**: doctor@example.com / password123
- **Admin**: admin@example.com / password123  
- **Patient**: patient@example.com / password123

## Navigation
- **Home**: Landing page with features
- **Login**: Authentication with role selection
- **Signup**: Account creation for doctors and admins
- **Doctor Dashboard**: Doctor's control panel
- **Patient Status**: Patient's queue tracking
- **Admin Dashboard**: System administration

## Features Demonstrated

### For Class Presentation:
1. **Responsive Design**: Works on desktop and mobile
2. **Role-Based Access**: Different interfaces for different users
3. **Real-Time Updates**: Mock live data updates
4. **Modern UI**: Beautiful gradients and animations
5. **Interactive Elements**: Status updates, notifications, queue management

### Technical Features:
- React Router for navigation
- Local storage for authentication
- Mock data for demonstration
- Responsive CSS Grid layouts
- Modern React hooks (useState, useEffect)

## File Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── LandingPage.js & .css
│   │   ├── Login.js & .css
│   │   ├── Signup.js & .css
│   │   ├── DoctorDashboard.js & .css
│   │   ├── PatientStatus.js & .css
│   │   └── AdminDashboard.js & .css
│   ├── App.js
│   └── App.css
```

## For Class Demonstration:

1. **Start the app**: `npm start`
2. **Show landing page**: Beautiful homepage
3. **Login as doctor**: Show doctor dashboard with status updates
4. **Login as patient**: Show patient queue tracking
5. **Login as admin**: Show admin overview and management
6. **Show responsiveness**: Resize browser window

## No Backend Required!
This version uses mock data and local storage, making it perfect for demonstrations without needing a database or server setup.

## Technologies Used
- React 18
- React Router DOM
- CSS3 with modern features
- Local Storage API
- Responsive Design
- Modern JavaScript (ES6+)

