// Servicio de Usuarios - Smart Condominium
// Mantiene el estilo establecido y patrón de LoginPage.jsx

import api from './api';

export const usuariosService = {
  // === GESTIÓN DE RESIDENTES ===
  
  // Obtener todos los residentes
  getResidentes: async (filtros = {}) => {
    try {
      const params = new URLSearchParams(filtros);
      const response = await api.get(`/usuarios/residentes/?${params}`);
      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al obtener los residentes'
      };
    }
  },

  // Obtener detalle de un residente
  getResidenteDetalle: async (residenteId) => {
    try {
      const response = await api.get(`/usuarios/residentes/${residenteId}/`);
      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al obtener el detalle del residente'
      };
    }
  },

  // === PERFIL DE USUARIO ===

  // Obtener perfil del usuario actual
  getPerfil: async () => {
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
  },

  // Actualizar perfil del usuario
  updatePerfil: async (perfilData) => {
    try {
      const response = await api.put('/usuarios/perfil/', perfilData);
      return {
        success: true,
        data: response.data,
        message: 'Perfil actualizado exitosamente'
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al actualizar el perfil'
      };
    }
  },

  // === REGISTRO DE USUARIOS ===

  // Registrar nuevo usuario
  registrarUsuario: async (userData) => {
    try {
      const response = await api.post('/usuarios/registro/', userData);
      return {
        success: true,
        data: response.data,
        message: 'Usuario registrado exitosamente'
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al registrar el usuario'
      };
    }
  },

  // Crear primer administrador (setup inicial)
  crearPrimerAdmin: async (adminData) => {
    try {
      const response = await api.post('/usuarios/setup/crear-primer-admin/', adminData);
      return {
        success: true,
        data: response.data,
        message: 'Administrador creado exitosamente'
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al crear el administrador'
      };
    }
  },

  // === RECONOCIMIENTO FACIAL (IA) ===

  // Registrar rostro para reconocimiento facial
  registrarRostro: async (rostroData) => {
    try {
      const response = await api.post('/usuarios/reconocimiento/registrar-rostro/', rostroData);
      return {
        success: true,
        data: response.data,
        message: 'Rostro registrado exitosamente para reconocimiento facial'
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al registrar el rostro'
      };
    }
  },

  // === DISPOSITIVOS ===

  // Registrar dispositivo para notificaciones
  registrarDispositivo: async (dispositivoData) => {
    try {
      const response = await api.post('/usuarios/dispositivos/registrar/', dispositivoData);
      return {
        success: true,
        data: response.data,
        message: 'Dispositivo registrado exitosamente'
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al registrar el dispositivo'
      };
    }
  },

  // === LOGIN ALTERNATIVO ===

  // Login alternativo (mantiene la misma funcionalidad que authService)
  login: async (username, password) => {
    try {
      const response = await api.post('/usuarios/login/', {
        username,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        return {
          success: true,
          token: response.data.token,
          message: '¡Inicio de sesión exitoso!'
        };
      }
    } catch (err) {
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

  // === UTILIDADES ===

  // Buscar residentes por nombre
  buscarResidentes: async (termino) => {
    return await usuariosService.getResidentes({ search: termino });
  },

  // Filtrar residentes por propiedad
  getResidentesPorPropiedad: async (propiedadId) => {
    return await usuariosService.getResidentes({ propiedad: propiedadId });
  },

  // Verificar si un username está disponible
  verificarUsernameDisponible: async (username) => {
    try {
      // Esta funcionalidad podría requerir un endpoint específico
      // Por ahora, intentamos obtener el perfil y vemos si da error
      const response = await api.get(`/usuarios/check-username/?username=${username}`);
      return {
        success: true,
        disponible: response.data.disponible
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al verificar disponibilidad del username'
      };
    }
  },

  // === ESTADÍSTICAS BÁSICAS ===

  // Obtener estadísticas de usuarios (calculadas en frontend)
  getEstadisticas: async () => {
    try {
      const residentesResponse = await usuariosService.getResidentes();

      if (residentesResponse.success) {
        const residentes = residentesResponse.data.results || residentesResponse.data;

        const stats = {
          totalResidentes: residentes.length,
          residentesActivos: residentes.filter(r => r.activo).length,
          residentesConRostro: residentes.filter(r => r.tiene_reconocimiento_facial).length,
          residentesConDispositivo: residentes.filter(r => r.tiene_dispositivo_registrado).length
        };

        return {
          success: true,
          data: stats
        };
      } else {
        throw new Error('Error al obtener datos de residentes');
      }
    } catch (err) {
      return {
        success: false,
        error: 'Error al calcular estadísticas de usuarios'
      };
    }
  }
};

export default usuariosService;