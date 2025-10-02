// Servicio de Seguridad con IA - Smart Condominium
// Mantiene el estilo establecido y patrón de LoginPage.jsx

import api from './api';

export const seguridadService = {
  // === VISITANTES ===
  
  // Obtener todos los visitantes
  getVisitantes: async (filtros = {}) => {
    try {
      const params = new URLSearchParams(filtros);
      const response = await api.get(`/seguridad/visitantes/?${params}`);
      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al obtener los visitantes'
      };
    }
  },

  // === VISITAS ===

  // Obtener todas las visitas
  getVisitas: async (filtros = {}) => {
    try {
      const params = new URLSearchParams(filtros);
      const response = await api.get(`/seguridad/visitas/?${params}`);
      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al obtener las visitas'
      };
    }
  },

  // Obtener visitas abiertas (en curso)
  getVisitasAbiertas: async () => {
    try {
      const response = await api.get('/seguridad/visitas-abiertas/');
      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al obtener las visitas abiertas'
      };
    }
  },

  // Cerrar visitas vencidas
  cerrarVisitasVencidas: async () => {
    try {
      const response = await api.post('/seguridad/cerrar-visitas-vencidas/');
      return {
        success: true,
        data: response.data,
        message: 'Visitas vencidas cerradas exitosamente'
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al cerrar visitas vencidas'
      };
    }
  },

  // === CONTROL VEHICULAR ===

  // Obtener vehículos registrados
  getVehiculos: async (filtros = {}) => {
    try {
      const params = new URLSearchParams(filtros);
      const response = await api.get(`/seguridad/vehiculos/?${params}`);
      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al obtener los vehículos'
      };
    }
  },

  // Control de acceso vehicular (entrada)
  controlAccesoVehicular: async (vehiculoData) => {
    try {
      const response = await api.post('/seguridad/control-acceso-vehicular/', vehiculoData);
      return {
        success: true,
        data: response.data,
        message: 'Acceso vehicular registrado exitosamente'
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al registrar el acceso vehicular'
      };
    }
  },

  // Control de salida vehicular
  controlSalidaVehicular: async (vehiculoData) => {
    try {
      const response = await api.post('/seguridad/control-salida-vehicular/', vehiculoData);
      return {
        success: true,
        data: response.data,
        message: 'Salida vehicular registrada exitosamente'
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al registrar la salida vehicular'
      };
    }
  },

  // === INTELIGENCIA ARTIFICIAL ===

  // Verificar rostro con IA
  verificarRostro: async (imagenData) => {
    try {
      const response = await api.post('/seguridad/ia/verificar-rostro/', imagenData);
      return {
        success: true,
        data: response.data,
        message: 'Rostro verificado exitosamente'
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error en la verificación de rostro'
      };
    }
  },

  // Control vehicular con IA
  controlVehicularIA: async (placaData) => {
    try {
      const response = await api.post('/seguridad/ia/control-vehicular/', placaData);
      return {
        success: true,
        data: response.data,
        message: 'Control vehicular IA procesado exitosamente'
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error en el control vehicular IA'
      };
    }
  },

  // === EVENTOS DE SEGURIDAD ===

  // Obtener eventos de seguridad
  getEventos: async (filtros = {}) => {
    try {
      const params = new URLSearchParams(filtros);
      const response = await api.get(`/seguridad/eventos/?${params}`);
      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al obtener los eventos de seguridad'
      };
    }
  },

  // Obtener detecciones de IA
  getDetecciones: async (filtros = {}) => {
    try {
      const params = new URLSearchParams(filtros);
      const response = await api.get(`/seguridad/detecciones/?${params}`);
      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al obtener las detecciones'
      };
    }
  },

  // === DASHBOARD DE SEGURIDAD ===

  // Obtener resumen del dashboard
  getDashboardResumen: async () => {
    try {
      const response = await api.get('/seguridad/dashboard/resumen/');
      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al obtener el resumen del dashboard'
      };
    }
  },

  // Obtener series de tiempo para gráficos
  getDashboardSeries: async (filtros = {}) => {
    try {
      const params = new URLSearchParams(filtros);
      const response = await api.get(`/seguridad/dashboard/series/?${params}`);
      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al obtener las series del dashboard'
      };
    }
  },

  // Obtener top visitantes
  getTopVisitantes: async (filtros = {}) => {
    try {
      const params = new URLSearchParams(filtros);
      const response = await api.get(`/seguridad/dashboard/top-visitantes/?${params}`);
      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al obtener el top de visitantes'
      };
    }
  },

  // === EXPORTACIÓN ===

  // Exportar visitas a CSV
  exportarVisitasCSV: async (filtros = {}) => {
    try {
      const params = new URLSearchParams(filtros);
      const response = await api.get(`/seguridad/export/visitas.csv?${params}`, {
        responseType: 'blob'
      });
      
      // Crear enlace de descarga
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'visitas.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      return {
        success: true,
        message: 'Archivo CSV descargado exitosamente'
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al exportar las visitas'
      };
    }
  }
};

export default seguridadService;