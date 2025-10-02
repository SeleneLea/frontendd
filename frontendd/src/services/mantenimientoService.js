// Servicio de Mantenimiento - Smart Condominium
// Mantiene el estilo establecido y patrón de LoginPage.jsx

import api from './api';

export const mantenimientoService = {
  // === SOLICITUDES DE MANTENIMIENTO ===
  
  // Obtener todas las solicitudes
  getSolicitudes: async (filtros = {}) => {
    try {
      const params = new URLSearchParams(filtros);
      const response = await api.get(`/mantenimiento/solicitudes/?${params}`);
      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al obtener las solicitudes de mantenimiento'
      };
    }
  },

  // Crear nueva solicitud
  createSolicitud: async (solicitudData) => {
    try {
      const response = await api.post('/mantenimiento/solicitudes/', solicitudData);
      return {
        success: true,
        data: response.data,
        message: 'Solicitud de mantenimiento creada exitosamente'
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al crear la solicitud de mantenimiento'
      };
    }
  },

  // Obtener detalle de una solicitud
  getSolicitudDetalle: async (solicitudId) => {
    try {
      const response = await api.get(`/mantenimiento/solicitudes/${solicitudId}/`);
      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al obtener el detalle de la solicitud'
      };
    }
  },

  // Actualizar solicitud
  updateSolicitud: async (solicitudId, solicitudData) => {
    try {
      const response = await api.put(`/mantenimiento/solicitudes/${solicitudId}/`, solicitudData);
      return {
        success: true,
        data: response.data,
        message: 'Solicitud actualizada exitosamente'
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al actualizar la solicitud'
      };
    }
  },

  // Asignar solicitud a personal
  asignarSolicitud: async (solicitudId, asignacionData) => {
    try {
      const response = await api.post(`/mantenimiento/solicitudes/${solicitudId}/asignar/`, asignacionData);
      return {
        success: true,
        data: response.data,
        message: 'Solicitud asignada exitosamente'
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al asignar la solicitud'
      };
    }
  },

  // Cambiar estado de solicitud
  cambiarEstadoSolicitud: async (solicitudId, estadoData) => {
    try {
      const response = await api.post(`/mantenimiento/solicitudes/${solicitudId}/cambiar_estado/`, estadoData);
      return {
        success: true,
        data: response.data,
        message: 'Estado de solicitud actualizado exitosamente'
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al cambiar el estado de la solicitud'
      };
    }
  },

  // === PERSONAL DE MANTENIMIENTO ===

  // Obtener todo el personal
  getPersonal: async (filtros = {}) => {
    try {
      const params = new URLSearchParams(filtros);
      const response = await api.get(`/mantenimiento/personal/?${params}`);
      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al obtener el personal de mantenimiento'
      };
    }
  },

  // Crear nuevo personal
  createPersonal: async (personalData) => {
    try {
      const response = await api.post('/mantenimiento/personal/', personalData);
      return {
        success: true,
        data: response.data,
        message: 'Personal de mantenimiento agregado exitosamente'
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al agregar personal de mantenimiento'
      };
    }
  },

  // Obtener detalle del personal
  getPersonalDetalle: async (personalId) => {
    try {
      const response = await api.get(`/mantenimiento/personal/${personalId}/`);
      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al obtener el detalle del personal'
      };
    }
  },

  // Actualizar personal
  updatePersonal: async (personalId, personalData) => {
    try {
      const response = await api.put(`/mantenimiento/personal/${personalId}/`, personalData);
      return {
        success: true,
        data: response.data,
        message: 'Personal actualizado exitosamente'
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al actualizar el personal'
      };
    }
  },

  // Eliminar personal
  deletePersonal: async (personalId) => {
    try {
      await api.delete(`/mantenimiento/personal/${personalId}/`);
      return {
        success: true,
        message: 'Personal eliminado exitosamente'
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al eliminar el personal'
      };
    }
  },

  // === UTILIDADES Y FILTROS ===

  // Obtener solicitudes por estado
  getSolicitudesPorEstado: async (estado) => {
    return await mantenimientoService.getSolicitudes({ estado });
  },

  // Obtener solicitudes por prioridad
  getSolicitudesPorPrioridad: async (prioridad) => {
    return await mantenimientoService.getSolicitudes({ prioridad });
  },

  // Obtener solicitudes asignadas a un técnico
  getSolicitudesAsignadasA: async (personalId) => {
    return await mantenimientoService.getSolicitudes({ asignado_a: personalId });
  },

  // Obtener personal por especialidad
  getPersonalPorEspecialidad: async (especialidad) => {
    return await mantenimientoService.getPersonal({ especialidad });
  },

  // === ESTADÍSTICAS Y REPORTES ===

  // Obtener estadísticas básicas (calculadas en frontend)
  getEstadisticas: async () => {
    try {
      const solicitudesResponse = await mantenimientoService.getSolicitudes();
      const personalResponse = await mantenimientoService.getPersonal();

      if (solicitudesResponse.success && personalResponse.success) {
        const solicitudes = solicitudesResponse.data.results || solicitudesResponse.data;
        const personal = personalResponse.data.results || personalResponse.data;

        // Calcular estadísticas
        const stats = {
          totalSolicitudes: solicitudes.length,
          solicitudesPendientes: solicitudes.filter(s => s.estado === 'PENDIENTE').length,
          solicitudesEnProgreso: solicitudes.filter(s => s.estado === 'EN_PROGRESO').length,
          solicitudesCompletadas: solicitudes.filter(s => s.estado === 'COMPLETADA').length,
          totalPersonal: personal.length,
          personalActivo: personal.filter(p => p.activo).length
        };

        return {
          success: true,
          data: stats
        };
      } else {
        throw new Error('Error al obtener datos para estadísticas');
      }
    } catch (err) {
      return {
        success: false,
        error: 'Error al calcular estadísticas de mantenimiento'
      };
    }
  }
};

export default mantenimientoService;