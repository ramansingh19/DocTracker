# DocTracker - Quick Start Implementation Guide

## Priority 1: Critical Foundation (Week 1-2)

### 1. Backend Setup

```bash
# Create backend directory
mkdir backend
cd backend

# Initialize Node.js project
npm init -y

# Install dependencies
npm install express cors helmet morgan dotenv
npm install bcrypt jsonwebtoken passport passport-jwt
npm install prisma @prisma/client
npm install socket.io
npm install redis ioredis
npm install nodemailer
npm install express-validator
npm install winston

# Install dev dependencies
npm install -D typescript @types/node @types/express
npm install -D @types/bcrypt @types/jsonwebtoken
npm install -D ts-node nodemon
npm install -D jest @types/jest ts-jest
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### 2. Database Setup

```bash
# Initialize Prisma
npx prisma init

# Create schema file (prisma/schema.prisma)
```

**prisma/schema.prisma:**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String   @id @default(uuid())
  email         String   @unique
  passwordHash  String   @map("password_hash")
  role          String   // doctor, patient, admin
  firstName     String?  @map("first_name")
  lastName      String?  @map("last_name")
  phone         String?
  isActive      Boolean  @default(true) @map("is_active")
  emailVerified Boolean  @default(false) @map("email_verified")
  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")
  
  doctor    Doctor?
  patient   Patient?
  
  @@map("users")
}

model Doctor {
  id                    String    @id
  userId                String    @unique @map("user_id")
  licenseNumber         String?   @unique @map("license_number")
  specialty             String?
  department            String?
  status                String    @default("available")
  currentLocationLat    Float?    @map("current_location_lat")
  currentLocationLng    Float?    @map("current_location_lng")
  locationUpdatedAt     DateTime? @map("location_updated_at")
  isLocationSharingEnabled Boolean @default(false) @map("is_location_sharing_enabled")
  consultationDurationMinutes Int  @default(15) @map("consultation_duration_minutes")
  createdAt             DateTime  @default(now()) @map("created_at")
  updatedAt             DateTime  @updatedAt @map("updated_at")
  
  user        User         @relation(fields: [userId], references: [id])
  appointments Appointment[]
  queue       Queue[]
  
  @@map("doctors")
}

model Patient {
  id                String   @id
  userId            String   @unique @map("user_id")
  dateOfBirth       DateTime? @map("date_of_birth")
  gender            String?
  emergencyContactName String? @map("emergency_contact_name")
  emergencyContactPhone String? @map("emergency_contact_phone")
  medicalHistory    String?  @map("medical_history")
  createdAt         DateTime @default(now()) @map("created_at")
  updatedAt         DateTime @updatedAt @map("updated_at")
  
  user         User         @relation(fields: [userId], references: [id])
  appointments Appointment[]
  queue        Queue[]
  
  @@map("patients")
}

model Appointment {
  id                      String   @id @default(uuid())
  patientId               String   @map("patient_id")
  doctorId                String   @map("doctor_id")
  appointmentDate         DateTime @map("appointment_date")
  status                  String   @default("scheduled")
  queuePosition           Int?     @map("queue_position")
  estimatedWaitTimeMinutes Int?    @map("estimated_wait_time_minutes")
  actualStartTime         DateTime? @map("actual_start_time")
  actualEndTime           DateTime? @map("actual_end_time")
  notes                   String?
  createdAt               DateTime @default(now()) @map("created_at")
  updatedAt               DateTime @updatedAt @map("updated_at")
  
  patient Patient @relation(fields: [patientId], references: [id])
  doctor  Doctor  @relation(fields: [doctorId], references: [id])
  queue   Queue?
  
  @@map("appointments")
}

model Queue {
  id            String   @id @default(uuid())
  appointmentId String   @unique @map("appointment_id")
  doctorId      String   @map("doctor_id")
  position      Int
  status        String   @default("waiting")
  checkedInAt   DateTime? @map("checked_in_at")
  calledAt      DateTime? @map("called_at")
  createdAt     DateTime @default(now()) @map("created_at")
  
  appointment Appointment @relation(fields: [appointmentId], references: [id])
  doctor      Doctor      @relation(fields: [doctorId], references: [id])
  
  @@map("queue")
}
```

```bash
# Generate Prisma Client
npx prisma generate

# Create migration
npx prisma migrate dev --name init

# Seed database (optional)
npx prisma db seed
```

### 3. Basic Server Setup

**backend/src/server.ts:**
```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
  }
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 4. Environment Variables

**backend/.env:**
```env
# Server
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/doctracker

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-refresh-secret-key-change-this
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Redis
REDIS_URL=redis://localhost:6379

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Google Maps
GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# Twilio (SMS)
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=your-phone-number
```

## Priority 2: Authentication (Week 2-3)

### 1. Auth Service

**backend/src/services/auth.service.ts:**
```typescript
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AuthService {
  async register(email: string, password: string, role: string, firstName?: string, lastName?: string) {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role,
        firstName,
        lastName
      }
    });

    // Create role-specific record
    if (role === 'doctor') {
      await prisma.doctor.create({
        data: { userId: user.id }
      });
    } else if (role === 'patient') {
      await prisma.patient.create({
        data: { userId: user.id }
      });
    }

    // Generate tokens
    const tokens = this.generateTokens(user.id, user.role);

    return { user, ...tokens };
  }

  async login(email: string, password: string) {
    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    // Generate tokens
    const tokens = this.generateTokens(user.id, user.role);

    return { user, ...tokens };
  }

  generateTokens(userId: string, role: string) {
    const accessToken = jwt.sign(
      { userId, role },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
    );

    const refreshToken = jwt.sign(
      { userId },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
    );

    return { accessToken, refreshToken };
  }

  async verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!);
  }
}
```

### 2. Auth Routes

**backend/src/routes/auth.routes.ts:**
```typescript
import express from 'express';
import { AuthService } from '../services/auth.service';
import { body, validationResult } from 'express-validator';

const router = express.Router();
const authService = new AuthService();

router.post('/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    body('role').isIn(['doctor', 'patient', 'admin'])
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, role, firstName, lastName } = req.body;
      const result = await authService.register(email, password, role, firstName, lastName);
      
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.post('/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      const result = await authService.login(email, password);
      
      res.json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
);

export default router;
```

### 3. Auth Middleware

**backend/src/middleware/auth.middleware.ts:**
```typescript
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = await authService.verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!roles.includes(user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};
```

## Priority 3: Frontend Integration (Week 3-4)

### 1. API Client Setup

**frontend/src/services/api.ts:**
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('accessToken');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async register(data: { email: string; password: string; role: string }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: { email: string; password: string }) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getDoctors() {
    return this.request('/doctors');
  }

  async updateDoctorStatus(doctorId: string, status: string) {
    return this.request(`/doctors/${doctorId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }
}

export const api = new ApiClient(API_BASE_URL);
```

### 2. Update Login Component

**frontend/src/components/Login.jsx:**
```javascript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'doctor'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.login(formData);
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.user));

      // Navigate based on role
      switch (response.user.role) {
        case 'doctor':
          navigate('/doctor-dashboard');
          break;
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'patient':
          navigate('/patient-status');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // ... rest of component
};
```

## Priority 4: Real-Time Features (Week 4-5)

### 1. Socket.io Client Setup

**frontend/src/services/socket.ts:**
```typescript
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';

export const socket = io(SOCKET_URL, {
  auth: {
    token: localStorage.getItem('accessToken')
  },
  autoConnect: false
});

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
```

### 2. Real-Time Queue Updates

**frontend/src/hooks/useQueue.ts:**
```typescript
import { useState, useEffect } from 'react';
import { socket } from '../services/socket';

export const useQueue = (doctorId: string) => {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    socket.connect();

    socket.on('queue:updated', (data) => {
      if (data.doctorId === doctorId) {
        setQueue(data.queue);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [doctorId]);

  return queue;
};
```

## Next Steps

1. **Week 5-6:** Implement appointment system
2. **Week 7-8:** Add notification system
3. **Week 9-10:** Build analytics dashboard
4. **Week 11-12:** Mobile app development
5. **Week 13-14:** Testing and optimization
6. **Week 15-16:** Deployment and monitoring

## Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Socket.io Documentation](https://socket.io/docs)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)

---

**Note:** This is a quick start guide. Refer to the full `INDUSTRY_EXPANSION_PLAN.md` for comprehensive details.




