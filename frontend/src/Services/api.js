import axios from 'axios';

const api = axios.create({
  baseURL: '', // Uses Vite proxy
});

// Interceptor to attach the JWT token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
