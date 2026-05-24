import axios from 'axios';
import { getStoredToken } from '@/lib/authStorage';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://e-commerce-website-hoid.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = getStoredToken(typeof window !== 'undefined' ? window.location.pathname : '/');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const productAPI = {
  getAll: (params?: { search?: string; category?: string; filter?: string; sort?: string; limit?: number }) =>
    api.get('/products', { params }),
  getById: (id: string) => api.get(`/products/${id}`),
  create: (data: FormData | object) =>
    api.post('/products', data),
  update: (id: string, data: FormData | object) =>
    api.put(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
};

export const orderAPI = {
  create: (data: {
    orderItems: { product: string; quantity: number; price: number }[];
    shippingAddress: string;
    totalPrice: number;
  }) => api.post('/orders', data),
  getMyOrders: () => api.get('/orders/myorders'),
  getById: (id: string) => api.get(`/orders/${id}`),
  getAll: () => api.get('/orders'),
  updateStatus: (id: string, status: string) =>
    api.put(`/orders/${id}/status`, { status }),
  getDashboard: () => api.get('/orders/dashboard'),
};

export default api;
