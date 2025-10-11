# DocTracker - Vite React Application

A modern, fast React application built with Vite for real-time doctor tracking and patient management system.

## 🚀 Features

### 🎨 Modern UI/UX
- **Beautiful Landing Page** with gradient backgrounds and animations
- **Responsive Design** that works on all devices
- **Professional Dashboard** for doctors, patients, and admins
- **Real-time Status Updates** with live indicators
- **Smooth Animations** and transitions

### 👥 Multi-Role Support
- **Doctor Dashboard**: Status management, patient queue, location sharing
- **Patient Status**: Real-time queue position, wait times, notifications
- **Admin Panel**: Complete system overview, doctor management, analytics
- **Secure Authentication** with role-based access

### 🛠 Technical Features
- **Vite Build Tool** for lightning-fast development
- **React 19** with modern hooks and components
- **React Router** for seamless navigation
- **CSS Modules** with custom styling
- **Mock Data** for demonstration purposes
- **Local Storage** for session management

## 🏗 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── LandingPage.jsx      # Modern landing page
│   │   ├── Login.jsx            # Authentication with role selection
│   │   ├── Signup.jsx           # User registration
│   │   ├── DoctorDashboard.jsx  # Doctor interface
│   │   ├── PatientStatus.jsx    # Patient queue tracking
│   │   ├── AdminDashboard.jsx   # Admin management panel
│   │   └── *.css               # Component-specific styles
│   ├── App.jsx                  # Main app with routing
│   ├── App.css                  # Global styles
│   ├── main.jsx                 # Application entry point
│   └── index.css                # Base styles and CSS variables
├── public/
├── package.json                 # Dependencies and scripts
├── vite.config.js              # Vite configuration
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (version 18 or higher)
- **npm** or **yarn**

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - The app will be available at `http://localhost:5173`
   - Vite provides hot module replacement for instant updates

## 🎯 Demo Credentials

### Doctor Account
- **Email:** doctor@example.com
- **Password:** password123
- **Features:** Status updates, patient queue, location sharing

### Admin Account
- **Email:** admin@example.com
- **Password:** password123
- **Features:** System overview, doctor management, analytics

### Patient Account
- **Email:** patient@example.com
- **Password:** password123
- **Features:** Queue tracking, wait times, notifications

## 🎨 Key Components

### 1. Landing Page
- **Hero Section** with animated particles
- **Feature Showcase** with interactive cards
- **How It Works** section
- **Professional Footer** with links

### 2. Authentication
- **Role-based Login** (Doctor, Admin, Patient)
- **Modern Form Design** with validation
- **Demo Credentials** display
- **Secure Session Management**

### 3. Doctor Dashboard
- **Status Management** (Available, Consulting, In Transit, etc.)
- **Patient Queue** with real-time updates
- **Location Sharing** toggle
- **Statistics Overview**

### 4. Patient Status
- **Queue Position** with live updates
- **Doctor Status** tracking
- **Wait Time Estimates**
- **Notification History**

### 5. Admin Dashboard
- **System Statistics** overview
- **Doctor Status** monitoring
- **Patient Queue** management
- **Quick Actions** panel

## 🛠 Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🎨 Styling Features

### CSS Variables
- **Consistent Color Palette** with CSS custom properties
- **Typography Scale** for consistent text sizing
- **Spacing System** for uniform layouts
- **Shadow System** for depth and elevation

### Responsive Design
- **Mobile-first** approach
- **Breakpoints** for different screen sizes
- **Flexible Grid** system
- **Touch-friendly** interactions

### Animations
- **Smooth Transitions** on hover and focus
- **Loading States** with spinners
- **Page Transitions** with fade effects
- **Interactive Elements** with micro-animations

## 🔧 Customization

### Adding New Components
1. Create component file in `src/components/`
2. Add corresponding CSS file
3. Import and use in `App.jsx`

### Styling Guidelines
- Use CSS variables for colors and spacing
- Follow the established design system
- Maintain consistent naming conventions
- Test responsiveness on different devices

### Mock Data
- All data is currently mocked for demonstration
- Located in component state and localStorage
- Easy to replace with real API calls

## 🌟 Performance Features

### Vite Optimizations
- **Fast Development** with HMR (Hot Module Replacement)
- **Optimized Builds** with tree shaking
- **Modern ES Modules** support
- **TypeScript** ready (optional)

### React Optimizations
- **React 19** with latest features
- **Efficient Re-renders** with proper state management
- **Code Splitting** with React Router
- **Lazy Loading** ready for future implementation

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel** (recommended for React apps)
- **Netlify** (great for static sites)
- **GitHub Pages** (free hosting)
- **AWS S3** (scalable hosting)

### Environment Variables
Create a `.env` file for configuration:
```env
VITE_APP_TITLE=DocTracker
VITE_API_URL=https://your-api-url.com
```

## 🔮 Future Enhancements

### Planned Features
- **Real-time WebSocket** connections
- **Push Notifications** for mobile devices
- **Advanced Analytics** and reporting
- **Multi-language** support
- **Dark Mode** toggle
- **Progressive Web App** (PWA) features

### Technical Improvements
- **TypeScript** integration
- **State Management** with Redux or Zustand
- **Testing** with Jest and React Testing Library
- **E2E Testing** with Playwright
- **CI/CD** pipeline setup

## 📱 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the demo credentials for testing

---

**Built with ❤️ using Vite + React**

*Fast, modern, and beautiful healthcare management solution*
