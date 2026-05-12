// API base URL - uses environment variable or defaults to relative path
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

function clearClientSession() {
  localStorage.removeItem('user');
  localStorage.removeItem('isAuthenticated');
}

let accessToken = null;
let refreshPromise = null;

function setAccessToken(token) {
  accessToken = token || null;
}

async function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: defaultHeaders,
      credentials: 'include',
    })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok || !data?.accessToken) {
          throw new Error(data?.message || 'Unable to refresh session');
        }
        setAccessToken(data.accessToken);
        return data.accessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

async function request(path, { method = 'GET', body, headers = {}, auth = true, retry = true } = {}) {
  const finalHeaders = { ...defaultHeaders, ...headers };
  const isAuthPath = path.startsWith('/auth/');

  if (auth && !accessToken && retry && !isAuthPath) {
    try {
      await refreshAccessToken();
    } catch {
      // Ignore pre-refresh errors and allow normal request flow/handling.
    }
  }

  if (auth) {
    if (accessToken) {
      finalHeaders.Authorization = `Bearer ${accessToken}`;
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
      let errorMessage = isJson && data?.message ? data.message : response.statusText;
      if (response.status === 401) {
        if (auth && retry && !isAuthPath) {
          try {
            await refreshAccessToken();
            return request(path, { method, body, headers, auth, retry: false });
          } catch {
            clearClientSession();
            errorMessage = 'Your session has expired. Please log in again.';
          }
        } else {
          clearClientSession();
          errorMessage = 'Your session has expired. Please log in again.';
        }
      } else if (!errorMessage) {
        errorMessage = 'Request failed';
      }
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
    console.error("API request failed", {
      url,
      method,
      message: error?.message,
      status: error?.status,
      details: error?.details,
    });
    throw error;
  }
}

export default {
  get: (path, options) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options) => request(path, { ...options, method: 'POST', body }),
  put: (path, body, options) => request(path, { ...options, method: 'PUT', body }),
  patch: (path, body, options) => request(path, { ...options, method: 'PATCH', body }),
  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
  setAccessToken,
};



