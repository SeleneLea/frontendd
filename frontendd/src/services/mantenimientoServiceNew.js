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

export const mantenimientoService = {
  // Obtener lista de solicitudes de mantenimiento
  async getSolicitudes() {
    try {
      const response = await apiClient.get('/api/mantenimiento/solicitudes/');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo solicitudes:', error);
      throw error;
    }
  },

  // Crear nueva solicitud de mantenimiento
  async createSolicitud(solicitudData) {
    try {
      const response = await apiClient.post('/api/mantenimiento/solicitudes/', solicitudData);
      return response.data;
    } catch (error) {
      console.error('Error creando solicitud:', error);
      throw error;
    }
  },

  // Actualizar solicitud de mantenimiento
  async updateSolicitud(id, solicitudData) {
    try {
      const response = await apiClient.put(`/api/mantenimiento/solicitudes/${id}/`, solicitudData);
      return response.data;
    } catch (error) {
      console.error('Error actualizando solicitud:', error);
      throw error;
    }
  }
};