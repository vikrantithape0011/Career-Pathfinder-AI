import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateUserProfile = async (updates) => {
  try {
    const response = await axios.patch(`${API_URL}/profile`, updates);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getTestResults = async () => {
  try {
    const response = await axios.get(`${API_URL}/test-results`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}; 