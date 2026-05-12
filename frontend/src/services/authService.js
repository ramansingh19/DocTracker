import apiClient from "./apiClient";

const USER_STORAGE_KEY = 'user';

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

export function storeSession({ user }) {
  if (user) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }
  localStorage.setItem('isAuthenticated', 'true');
}

export function clearSession() {
  apiClient.setAccessToken(null);
  localStorage.removeItem(USER_STORAGE_KEY);
  localStorage.removeItem('isAuthenticated');
}

export async function login(credentials) {
  try {
    const { email, password } = credentials;

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const data = await apiClient.post(
      '/auth/login',
      { email, password },
      { auth: false }
    );

    const user = data.user || data;
    const token = data.token;
    const userData = {
      ...user,
      id: user.id || user._id,
    };

    const response = { user: userData, token };
    apiClient.setAccessToken(token);
    storeSession(response);
    return response;
  } catch (error) {
    console.error('Login error:', error);
    const message = error.message || (error.details && error.details[0]?.message) || 'Invalid email or password';
    throw new Error(message);
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

    const data = await apiClient.post(
      '/auth/register',
      { name, email, password, role: role || 'patient' },
      { auth: false }
    );

    const user = data.user || data;
    const token = data.token;
    const userData = {
      ...user,
      id: user.id || user._id,
    };

    const response = { user: userData, token };
    apiClient.setAccessToken(token);
    storeSession(response);
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    const message = error.message || (error.details && error.details[0]?.message) || 'Unable to create account. Please try again.';
    throw new Error(message);
  }
}

export default {
  login,
  register,
  getStoredUser,
  storeSession,
  clearSession,
};



