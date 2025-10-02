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

export const seguridadService = {
  // Obtener lista de visitas
  async getVisitas() {
    try {
      const response = await apiClient.get('/api/seguridad/visitas/');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo visitas:', error);
      throw error;
    }
  },

  // Registrar nueva visita
  async registrarVisita(visitaData) {
    try {
      const response = await apiClient.post('/api/seguridad/visitas/', visitaData);
      return response.data;
    } catch (error) {
      console.error('Error registrando visita:', error);
      throw error;
    }
  },

  // Obtener lista de visitantes
  async getVisitantes() {
    try {
      const response = await apiClient.get('/api/seguridad/visitantes/');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo visitantes:', error);
      throw error;
    }
  },

  // Control de acceso
  async controlAcceso(accesoData) {
    try {
      const response = await apiClient.post('/api/seguridad/control-acceso/', accesoData);
      return response.data;
    } catch (error) {
      console.error('Error en control de acceso:', error);
      throw error;
    }
  }
};