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

export const notificacionesService = {
  // Obtener lista de notificaciones
  async getNotificaciones() {
    try {
      const response = await apiClient.get('/api/notificaciones/');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo notificaciones:', error);
      throw error;
    }
  },

  // Enviar notificación
  async enviarNotificacion(notificacionData) {
    try {
      const response = await apiClient.post('/api/notificaciones/enviar/', notificacionData);
      return response.data;
    } catch (error) {
      console.error('Error enviando notificación:', error);
      throw error;
    }
  }
};

export const auditoriaService = {
  // Obtener bitácora de eventos
  async getBitacora() {
    try {
      const response = await apiClient.get('/api/auditoria/bitacora/');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo bitácora:', error);
      throw error;
    }
  }
};