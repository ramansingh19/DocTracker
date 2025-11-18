import apiClient from './apiClient';

const USER_STORAGE_KEY = 'user';
const AUTH_TOKEN_KEY = 'authToken';

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
    const response = await apiClient.post('/auth/login', credentials, { auth: false });
    if (response && response.user && response.token) {
      storeSession(response);
      return response;
    } else {
      throw new Error('Invalid response format from server');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function register(payload) {
  try {
    const response = await apiClient.post('/auth/register', payload, { auth: false });
    if (response && response.user && response.token) {
      storeSession(response);
      return response;
    } else {
      throw new Error('Invalid response format from server');
    }
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



