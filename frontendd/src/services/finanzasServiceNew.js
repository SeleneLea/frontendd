import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para agregar token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const finanzasService = {
  // Obtener lista de gastos
  async getGastos() {
    try {
      const response = await apiClient.get('/api/finanzas/gastos/');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo gastos:', error);
      throw error;
    }
  },

  // Crear nuevo gasto
  async createGasto(gastoData) {
    try {
      const response = await apiClient.post('/api/finanzas/gastos/', gastoData);
      return response.data;
    } catch (error) {
      console.error('Error creando gasto:', error);
      throw error;
    }
  },

  // Obtener lista de pagos
  async getPagos() {
    try {
      const response = await apiClient.get('/api/finanzas/pagos/');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo pagos:', error);
      throw error;
    }
  },

  // Realizar pago
  async realizarPago(pagoData) {
    try {
      const response = await apiClient.post('/api/finanzas/pagos/', pagoData);
      return response.data;
    } catch (error) {
      console.error('Error realizando pago:', error);
      throw error;
    }
  }
};