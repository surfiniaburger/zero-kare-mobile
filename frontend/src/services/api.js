// File: src/services/api.js
import Constants from 'expo-constants';
import axios from 'axios';

const BASE_URL = Constants.expoConfig.extra.apiUrl;

const api = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = {
  getTempToken: async (clientId) => {
    const response = await api.post('/auth/temp-token', { clientId });
    return response.data;
  },

  register: async (data, tempToken) => {
    const response = await api.post('/auth/register', data, {
      headers: {
        'x-temp-token': tempToken,
      },
    });
    return response.data;
  },
};

export default api;