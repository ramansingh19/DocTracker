// Use environment variable or default to relative URL (when using Vite proxy)
// For production, set VITE_API_BASE_URL to the full backend URL
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
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      console.error('Network Error:', {
        url,
        method,
        message: error.message,
        apiBaseUrl: API_BASE_URL
      });
      throw new Error(
        `Cannot connect to backend server at ${API_BASE_URL}. ` +
        `Please ensure the backend server is running on port 5000 (or check your VITE_API_BASE_URL environment variable).`
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



