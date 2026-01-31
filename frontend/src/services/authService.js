const USER_STORAGE_KEY = 'user';
const AUTH_TOKEN_KEY = 'authToken';
const USERS_STORAGE_KEY = 'doctracker_users';

// Get all registered users from localStorage
function getAllUsers() {
  const users = localStorage.getItem(USERS_STORAGE_KEY);
  return users ? JSON.parse(users) : [];
}

// Save all users to localStorage
function saveAllUsers(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

// Generate a simple token
function generateToken(userId) {
  return `token_${userId}_${Date.now()}`;
}

export function getStoredUser() {
  const raw = localStorage.getItem(USER_STORAGE_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
}

export function storeSession({ user, token }) {
  if (user) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }
  localStorage.setItem('isAuthenticated', 'true');
}

export function clearSession() {
  localStorage.removeItem(USER_STORAGE_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem('isAuthenticated');
}

export async function login(credentials) {
  try {
    const { email, password } = credentials;
    
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const users = getAllUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    if (user.password !== password) {
      throw new Error('Invalid email or password');
    }

    // Create user object without password
    const { password: _, ...userWithoutPassword } = user;
    const userData = {
      ...userWithoutPassword,
      id: user.id || user.email,
    };

    const token = generateToken(userData.id);
    
    const response = {
      user: userData,
      token: token
    };
    
    storeSession(response);
    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function register(payload) {
  try {
    const { name, email, password, role } = payload;
    
    if (!name || !email || !password) {
      throw new Error('Name, email, and password are required');
    }

    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    const users = getAllUsers();
    
    // Check if user already exists
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Create new user
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email: email.toLowerCase(),
      password, // In a real app, this should be hashed
      role: role || 'patient',
      createdAt: new Date().toISOString(),
    };

    // Add user to the list
    users.push(newUser);
    saveAllUsers(users);

    // Create user object without password
    const { password: _, ...userWithoutPassword } = newUser;
    const userData = {
      ...userWithoutPassword,
    };

    const token = generateToken(newUser.id);
    
    const response = {
      user: userData,
      token: token
    };
    
    storeSession(response);
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

export default {
  login,
  register,
  getStoredUser,
  storeSession,
  clearSession,
};



