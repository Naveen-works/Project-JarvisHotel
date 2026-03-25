import api from './api';
import { jwtDecode } from 'jwt-decode';

export const authService = {
  async register(name, email, password) {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      return { success: true, message: response.data.message || 'Registration successful' };
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        return { success: false, error: error.response.data.message };
      }
      return { success: false, error: 'Registration failed' };
    }
  },

  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      const token = response.data.token || response.data;
      localStorage.setItem('jwt_token', token);
      
      // Decode JWT to get user info if possible, or store from response
      let user = { email };
      if (response.data.user) {
         user = response.data.user;
      } else {
        try {
          const decoded = jwtDecode(token);
          // E.g. decoded payload has sub (email), maybe userId
          user = { ...user, ...decoded };
        } catch(e) {}
      }
      localStorage.setItem('user', JSON.stringify(user));
      
      return { success: true };
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        return { success: false, error: error.response.data.message };
      }
      return { success: false, error: 'Invalid email or password' };
    }
  },

  logout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch (e) {
      return null;
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem('jwt_token');
  }
};
