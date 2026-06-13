import axios from 'axios';

const baseURL = import.meta.env.VITE_NODE_SERVER;

if (!baseURL) {
  console.warn('VITE_NODE_SERVER is not configured. API requests will fail.');
}

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

export function getErrorMessage(error, fallback = 'Something went wrong') {
  const data = error?.response?.data;
  if (typeof data === 'string' && data.trim()) return data;
  return data?.error?.message || data?.message || error?.message || fallback;
}

export async function request(config) {
  const response = await api.request(config);
  return response.data;
}
