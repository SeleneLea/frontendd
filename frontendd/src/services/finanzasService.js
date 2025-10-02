// Servicio de Finanzas - Smart Condominium
// Mantiene el estilo establecido y patrón de LoginPage.jsx

import api from './api';

export const finanzasService = {
  // === GASTOS ===
  
  // Obtener todos los gastos
  getGastos: async (filtros = {}) => {
    try {
      const params = new URLSearchParams(filtros);
      const response = await api.get(`/finanzas/gastos/?${params}`);
      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al obtener los gastos'
      };
    }
  },

  // Crear nuevo gasto
  createGasto: async (gastoData) => {
    try {
      const response = await api.post('/finanzas/gastos/', gastoData);
      return {
        success: true,
        data: response.data,
        message: 'Gasto creado exitosamente'
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al crear el gasto'
      };
    }
  },

  // Crear gastos mensuales
  createGastosMensuales: async (data) => {
    try {
      const response = await api.post('/finanzas/gastos/crear_mensual/', data);
      return {
        success: true,
        data: response.data,
        message: 'Gastos mensuales creados exitosamente'
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al crear gastos mensuales'
      };
    }
  },

  // === PAGOS ===

  // Obtener todos los pagos
  getPagos: async (filtros = {}) => {
    try {
      const params = new URLSearchParams(filtros);
      const response = await api.get(`/finanzas/pagos/?${params}`);
      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al obtener los pagos'
      };
    }
  },

  // Registrar nuevo pago
  createPago: async (pagoData) => {
    try {
      const response = await api.post('/finanzas/pagos/', pagoData);
      return {
        success: true,
        data: response.data,
        message: 'Pago registrado exitosamente'
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al registrar el pago'
      };
    }
  },

  // Obtener comprobante de pago
  getComprobantePago: async (pagoId) => {
    try {
      const response = await api.get(`/finanzas/pagos/${pagoId}/comprobante/`);
      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al obtener el comprobante'
      };
    }
  },

  // === MULTAS ===

  // Obtener todas las multas
  getMultas: async (filtros = {}) => {
    try {
      const params = new URLSearchParams(filtros);
      const response = await api.get(`/finanzas/multas/?${params}`);
      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al obtener las multas'
      };
    }
  },

  // Crear nueva multa
  createMulta: async (multaData) => {
    try {
      const response = await api.post('/finanzas/multas/', multaData);
      return {
        success: true,
        data: response.data,
        message: 'Multa creada exitosamente'
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al crear la multa'
      };
    }
  },

  // === REPORTES ===

  // Obtener estado de cuenta
  getEstadoCuenta: async (filtros = {}) => {
    try {
      const params = new URLSearchParams(filtros);
      const response = await api.get(`/finanzas/estado-de-cuenta/?${params}`);
      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al obtener el estado de cuenta'
      };
    }
  },

  // Obtener resumen financiero
  getResumenFinanciero: async () => {
    try {
      const response = await api.get('/finanzas/reportes/resumen/');
      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al obtener el resumen financiero'
      };
    }
  },

  // Obtener reporte financiero completo
  getReporteFinanciero: async (filtros = {}) => {
    try {
      const params = new URLSearchParams(filtros);
      const response = await api.get(`/finanzas/reportes/financiero/?${params}`);
      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al obtener el reporte financiero'
      };
    }
  },

  // === RESERVAS ===

  // Obtener reservas de áreas comunes
  getReservas: async (filtros = {}) => {
    try {
      const params = new URLSearchParams(filtros);
      const response = await api.get(`/finanzas/reservas/?${params}`);
      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al obtener las reservas'
      };
    }
  },

  // Crear nueva reserva
  createReserva: async (reservaData) => {
    try {
      const response = await api.post('/finanzas/reservas/', reservaData);
      return {
        success: true,
        data: response.data,
        message: 'Reserva creada exitosamente'
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al crear la reserva'
      };
    }
  },

  // Pagar reserva
  pagarReserva: async (reservaId, pagoData) => {
    try {
      const response = await api.post(`/finanzas/reservas/${reservaId}/pagar/`, pagoData);
      return {
        success: true,
        data: response.data,
        message: 'Pago de reserva procesado exitosamente'
      };
    } catch (err) {
      return {
        success: false,
        error: 'Error al procesar el pago de la reserva'
      };
    }
  }
};

export default finanzasService;