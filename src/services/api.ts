import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },
};

export const users = {
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },
  updateProfile: async (data: any) => {
    const response = await api.put('/users/profile', data);
    return response.data;
  },
  saveCareer: async (careerId: string) => {
    const response = await api.post('/users/careers', { careerId });
    return response.data;
  },
  getSavedCareers: async () => {
    const response = await api.get('/users/careers');
    return response.data;
  },
  removeSavedCareer: async (careerTitle: string) => {
    const response = await api.delete(`/careers/saved/${encodeURIComponent(careerTitle)}`);
    return response.data;
  },
};

export const careers = {
  search: async (query: string) => {
    const response = await api.get('/careers/search', { params: { query } });
    return response.data;
  },
  getRecommendations: async () => {
    const response = await api.get('/careers/recommendations');
    return response.data;
  },
  getRoadmap: async (careerId: string) => {
    const response = await api.get(`/careers/${careerId}/roadmap`);
    return response.data;
  },
  getCareerPath: async (careerTitle: string) => {
    const response = await api.get(`/careers/path/${encodeURIComponent(careerTitle)}`);
    console.log("API response in getCareerPath:", response);
    return response.data;
  },
};

export const tests = {
  submitPsychometric: async (data: { scores: Record<string, any> }) => {
    const response = await api.post('/tests/psychometric', data);
    return response.data;
  },
  getResults: async () => {
    const response = await api.get('/tests/results');
    return response.data;
  },
};

export default api; 