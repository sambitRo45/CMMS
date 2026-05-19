import axios from 'axios';

/**
 * IMPORTANT:
 * Do NOT use mock adapter in real API calls
 * It intercepts requests and prevents backend hit
 */

const axiosInt = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Request Interceptor
 */
axiosInt.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor
 */
axiosInt.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('AXIOS ERROR:', error?.response || error);
    return Promise.reject(error);
  }
);

export default axiosInt;