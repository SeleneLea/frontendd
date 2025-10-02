// Servicio de Autenticación - Smart Condominium
// Mantiene el estilo establecido en LoginPage.jsx

import api from './api';

export const authService = {
  // Login - Mantiene la misma lógica que LoginPage.jsx
  login: async (username, password) => {
    try {
      // Hacemos la llamada a la API que está en LoginPage
      const response = await api.post('/login/', {
        username,
        password,
      });

      // Si la autenticación es exitosa, el backend devuelve token
      if (response.data.token) {
        // Guardamos el token como está comentado en LoginPage
        localStorage.setItem('authToken', response.data.token);
        return {
          success: true,
          token: response.data.token,
          message: '¡Inicio de sesión exitoso!'
        };
      }
    } catch (err) {
      // Manejo de errores igual que en LoginPage
      if (err.response && err.response.status === 401) {
        return {
          success: false,
          error: 'Credenciales incorrectas. Por favor, inténtelo de nuevo.'
        };
      } else {
        return {
          success: false,
          error: 'Error de conexión con el servidor. ¿El backend está funcionando?'
        };
      }
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  },

  // Verificar si está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  // Obtener token actual
  getToken: () => {
    return localStorage.getItem('authToken');
  },

  // Obtener perfil del usuario
  getProfile: async () => {
    try {
      const response = await api.get('/usuarios/perfil/');
      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al obtener el perfil del usuario'
      };
    }
  }
};

export default authService;