// API base URL - uses environment variable or defaults to relative path
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

function getAuthToken() {
  return localStorage.getItem('authToken');
}

async function request(path, { method = 'GET', body, headers = {}, auth = true } = {}) {
  const finalHeaders = { ...defaultHeaders, ...headers };

  if (auth) {
    const token = getAuthToken();
    if (token) {
      finalHeaders.Authorization = `Bearer ${token}`;
    }
  }

  const url = `${API_BASE_URL}${path}`;
  
  try {
    const response = await fetch(url, {
      method,
      headers: finalHeaders,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include', // Fix for CORS credentials
    });

    const contentType = response.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      const errorMessage = isJson && data?.message ? data.message : response.statusText;
      const error = new Error(errorMessage || 'Request failed');
      error.status = response.status;
      error.details = data?.details;
      throw error;
    }

    return data;
  } catch (error) {
    // Enhanced error handling for network errors
    if (error.name === 'TypeError' && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
      console.error('Network Error:', {
        url,
        method,
        message: error.message,
        apiBaseUrl: API_BASE_URL
      });
      
      // More helpful error message
      const isLocalDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      if (isLocalDev && API_BASE_URL === '/api') {
        throw new Error(
          'Unable to connect to the backend server. Please make sure the backend server is running on port 5000.'
        );
      }
      
      throw new Error(
        `Unable to connect to the server. Please check your connection and try again.`
      );
    }
    throw error;
  }
}

export default {
  get: (path, options) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options) => request(path, { ...options, method: 'POST', body }),
  patch: (path, body, options) => request(path, { ...options, method: 'PATCH', body }),
  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
};



