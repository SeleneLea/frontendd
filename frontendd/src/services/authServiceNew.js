import axios from 'axios';

// Configuración base de la API
const API_BASE_URL = 'http://localhost:8000';

// Crear instancia de axios con configuración base
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para agregar token automáticamente
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  // Login con las credenciales reales del backend
  async login(username, password) {
    try {
      const response = await apiClient.post('/api/login/', {
        username,
        password
      });

      if (response.data.access) {
        // Guardar tokens
        localStorage.setItem('access_token', response.data.access);
        if (response.data.refresh) {
          localStorage.setItem('refresh_token', response.data.refresh);
        }
        
        return {
          success: true,
          access: response.data.access,
          refresh: response.data.refresh,
          user: response.data.user || null
        };
      }
      
      return {
        success: false,
        error: 'Respuesta inválida del servidor'
      };
    } catch (error) {
      console.error('Error en login:', error);
      return {
        success: false,
        error: error.response?.data?.detail || 
               error.response?.data?.error || 
               'Error de conexión con el servidor'
      };
    }
  },

  // Obtener perfil del usuario actual
  async getCurrentUser() {
    try {
      const response = await apiClient.get('/api/usuarios/perfil/');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo perfil:', error);
      throw error;
    }
  },

  // Actualizar perfil del usuario
  async updateProfile(profileData) {
    try {
      const response = await apiClient.put('/api/usuarios/perfil/', profileData);
      return response.data;
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      throw error;
    }
  },

  // Registro de nuevo usuario
  async register(userData) {
    try {
      const response = await apiClient.post('/api/registro/', userData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error en registro:', error);
      return {
        success: false,
        error: error.response?.data?.detail || 'Error en el registro'
      };
    }
  },

  // Registrar dispositivo móvil
  async registerDevice(deviceData) {
    try {
      const response = await apiClient.post('/api/dispositivos/registrar/', deviceData);
      return response.data;
    } catch (error) {
      console.error('Error registrando dispositivo:', error);
      throw error;
    }
  },

  // Logout
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  // Verificar si el usuario está autenticado
  isAuthenticated() {
    return !!localStorage.getItem('access_token');
  },

  // Obtener token
  getToken() {
    return localStorage.getItem('access_token');
  }
};