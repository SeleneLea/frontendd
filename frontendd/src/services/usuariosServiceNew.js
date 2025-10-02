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

export const usuariosService = {
  // Obtener lista de usuarios
  async getUsuarios() {
    try {
      const response = await apiClient.get('/api/usuarios/');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
      throw error;
    }
  },

  // Obtener propiedades del condominio
  async getPropiedades() {
    try {
      const response = await apiClient.get('/api/condominio/propiedades/');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo propiedades:', error);
      throw error;
    }
  },

  // Crear nueva propiedad
  async createPropiedad(propiedadData) {
    try {
      const response = await apiClient.post('/api/condominio/propiedades/', propiedadData);
      return response.data;
    } catch (error) {
      console.error('Error creando propiedad:', error);
      throw error;
    }
  },

  // Obtener residentes
  async getResidentes() {
    try {
      const response = await apiClient.get('/api/condominio/residentes/');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo residentes:', error);
      throw error;
    }
  }
};