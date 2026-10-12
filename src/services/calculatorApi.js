import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  timeout: 10000,
});

export const calculateExpression = async (expression) => {
  try {
    const { data } = await api.post('/calculations', { expression });
    return data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Unable to calculate expression.';
    throw new Error(message);
  }
};

export const fetchHistory = async () => {
  try {
    const { data } = await api.get('/calculations');
    return data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Unable to load calculation history.';
    throw new Error(message);
  }
};

export const clearHistory = async () => {
  try {
    await api.delete('/calculations');
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Unable to clear calculation history.';
    throw new Error(message);
  }
};

export default api;
