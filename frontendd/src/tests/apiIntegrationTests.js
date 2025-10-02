// Tests de Integración API - Smart Condominium
// Verificación completa de conectividad con el backend

import { authService } from '../services/authService';
import { finanzasService } from '../services/finanzasService';
import { seguridadService } from '../services/seguridadService';
import { mantenimientoService } from '../services/mantenimientoService';
import { usuariosService } from '../services/usuariosService';

// Configuración de pruebas
const TEST_CONFIG = {
  // Credenciales de prueba verificadas del backend
  usuarios: {
    admin: { username: 'admin', password: 'admin123', role: 'PROPIETARIO' },
    residente: { username: 'residente1', password: 'isaelOrtiz2', role: 'RESIDENTE' },
    seguridad: { username: 'seguridad1', password: 'guardia123', role: 'SEGURIDAD' },
    mantenimiento: { username: 'electricista1', password: 'electrico123', role: 'MANTENIMIENTO' }
  },
  timeout: 10000 // 10 segundos timeout para cada test
};

// Clase para manejar los tests
class APITester {
  constructor() {
    this.resultados = [];
    this.token = null;
  }

  // Método para ejecutar un test individual
  async ejecutarTest(nombre, testFn) {
    console.log(`🧪 Ejecutando: ${nombre}`);
    const startTime = Date.now();
    
    try {
      const resultado = await Promise.race([
        testFn(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), TEST_CONFIG.timeout)
        )
      ]);
      
      const duration = Date.now() - startTime;
      const testResult = {
        nombre,
        estado: 'ÉXITO',
        duracion: `${duration}ms`,
        resultado,
        timestamp: new Date().toISOString()
      };
      
      this.resultados.push(testResult);
      console.log(`✅ ${nombre} - ${duration}ms`);
      return testResult;
      
    } catch (error) {
      const duration = Date.now() - startTime;
      const testResult = {
        nombre,
        estado: 'ERROR',
        duracion: `${duration}ms`,
        error: error.message,
        timestamp: new Date().toISOString()
      };
      
      this.resultados.push(testResult);
      console.log(`❌ ${nombre} - ${error.message}`);
      return testResult;
    }
  }

  // Tests de Autenticación
  async testAutenticacion() {
    console.log('\n🔐 === TESTS DE AUTENTICACIÓN ===');

    // Test 1: Login Admin
    await this.ejecutarTest('Login Admin', async () => {
      const result = await authService.login(
        TEST_CONFIG.usuarios.admin.username,
        TEST_CONFIG.usuarios.admin.password
      );
      
      if (result.success && result.token) {
        this.token = result.token; // Guardar token para otros tests
        return `Token obtenido: ${result.token.substring(0, 20)}...`;
      } else {
        throw new Error(result.error || 'Login falló');
      }
    });

    // Test 2: Obtener Perfil
    await this.ejecutarTest('Obtener Perfil Admin', async () => {
      const result = await authService.getProfile();
      
      if (result.success) {
        return `Perfil obtenido: ${result.data.username}`;
      } else {
        throw new Error(result.error || 'No se pudo obtener perfil');
      }
    });

    // Test 3: Login otros usuarios
    for (const [tipo, usuario] of Object.entries(TEST_CONFIG.usuarios)) {
      if (tipo !== 'admin') {
        await this.ejecutarTest(`Login ${tipo}`, async () => {
          const result = await authService.login(usuario.username, usuario.password);
          
          if (result.success && result.token) {
            return `Login exitoso para ${usuario.username}`;
          } else {
            throw new Error(result.error || 'Login falló');
          }
        });
      }
    }
  }

  // Tests de Módulo Finanzas
  async testFinanzas() {
    console.log('\n💰 === TESTS DE FINANZAS ===');

    await this.ejecutarTest('Obtener Gastos', async () => {
      const result = await finanzasService.getGastos();
      
      if (result.success) {
        const count = result.data.results ? result.data.results.length : result.data.length;
        return `${count} gastos obtenidos`;
      } else {
        throw new Error(result.error);
      }
    });

    await this.ejecutarTest('Obtener Pagos', async () => {
      const result = await finanzasService.getPagos();
      
      if (result.success) {
        const count = result.data.results ? result.data.results.length : result.data.length;
        return `${count} pagos obtenidos`;
      } else {
        throw new Error(result.error);
      }
    });

    await this.ejecutarTest('Obtener Estado de Cuenta', async () => {
      const result = await finanzasService.getEstadoCuenta();
      
      if (result.success) {
        return 'Estado de cuenta obtenido exitosamente';
      } else {
        throw new Error(result.error);
      }
    });

    await this.ejecutarTest('Obtener Resumen Financiero', async () => {
      const result = await finanzasService.getResumenFinanciero();
      
      if (result.success) {
        return 'Resumen financiero obtenido exitosamente';
      } else {
        throw new Error(result.error);
      }
    });

    await this.ejecutarTest('Obtener Multas', async () => {
      const result = await finanzasService.getMultas();
      
      if (result.success) {
        const count = result.data.results ? result.data.results.length : result.data.length;
        return `${count} multas obtenidas`;
      } else {
        throw new Error(result.error);
      }
    });
  }

  // Tests de Módulo Seguridad
  async testSeguridad() {
    console.log('\n🛡️ === TESTS DE SEGURIDAD ===');

    await this.ejecutarTest('Obtener Visitantes', async () => {
      const result = await seguridadService.getVisitantes();
      
      if (result.success) {
        const count = result.data.results ? result.data.results.length : result.data.length;
        return `${count} visitantes obtenidos`;
      } else {
        throw new Error(result.error);
      }
    });

    await this.ejecutarTest('Obtener Visitas', async () => {
      const result = await seguridadService.getVisitas();
      
      if (result.success) {
        const count = result.data.results ? result.data.results.length : result.data.length;
        return `${count} visitas obtenidas`;
      } else {
        throw new Error(result.error);
      }
    });

    await this.ejecutarTest('Obtener Visitas Abiertas', async () => {
      const result = await seguridadService.getVisitasAbiertas();
      
      if (result.success) {
        const count = result.data.results ? result.data.results.length : result.data.length;
        return `${count} visitas abiertas obtenidas`;
      } else {
        throw new Error(result.error);
      }
    });

    await this.ejecutarTest('Obtener Vehículos', async () => {
      const result = await seguridadService.getVehiculos();
      
      if (result.success) {
        const count = result.data.results ? result.data.results.length : result.data.length;
        return `${count} vehículos obtenidos`;
      } else {
        throw new Error(result.error);
      }
    });

    await this.ejecutarTest('Dashboard Seguridad - Resumen', async () => {
      const result = await seguridadService.getDashboardResumen();
      
      if (result.success) {
        return 'Resumen dashboard seguridad obtenido';
      } else {
        throw new Error(result.error);
      }
    });
  }

  // Tests de Módulo Mantenimiento
  async testMantenimiento() {
    console.log('\n🔧 === TESTS DE MANTENIMIENTO ===');

    await this.ejecutarTest('Obtener Solicitudes', async () => {
      const result = await mantenimientoService.getSolicitudes();
      
      if (result.success) {
        const count = result.data.results ? result.data.results.length : result.data.length;
        return `${count} solicitudes obtenidas`;
      } else {
        throw new Error(result.error);
      }
    });

    await this.ejecutarTest('Obtener Personal', async () => {
      const result = await mantenimientoService.getPersonal();
      
      if (result.success) {
        const count = result.data.results ? result.data.results.length : result.data.length;
        return `${count} personal obtenido`;
      } else {
        throw new Error(result.error);
      }
    });

    await this.ejecutarTest('Obtener Estadísticas Mantenimiento', async () => {
      const result = await mantenimientoService.getEstadisticas();
      
      if (result.success) {
        return `Stats: ${result.data.totalSolicitudes} solicitudes total`;
      } else {
        throw new Error(result.error);
      }
    });
  }

  // Tests de Módulo Usuarios
  async testUsuarios() {
    console.log('\n👥 === TESTS DE USUARIOS ===');

    await this.ejecutarTest('Obtener Residentes', async () => {
      const result = await usuariosService.getResidentes();
      
      if (result.success) {
        const count = result.data.results ? result.data.results.length : result.data.length;
        return `${count} residentes obtenidos`;
      } else {
        throw new Error(result.error);
      }
    });

    await this.ejecutarTest('Obtener Perfil Usuario', async () => {
      const result = await usuariosService.getPerfil();
      
      if (result.success) {
        return `Perfil obtenido: ${result.data.username || 'Sin username'}`;
      } else {
        throw new Error(result.error);
      }
    });
  }

  // Método principal para ejecutar todas las pruebas
  async ejecutarTodasLasPruebas() {
    console.log('🚀 Iniciando Tests de Integración API - Smart Condominium');
    console.log('==========================================');
    
    const startTime = Date.now();

    try {
      // Ejecutar tests por módulos
      await this.testAutenticacion();
      await this.testFinanzas();
      await this.testSeguridad();
      await this.testMantenimiento();
      await this.testUsuarios();

      const totalTime = Date.now() - startTime;
      
      // Generar reporte final
      this.generarReporte(totalTime);
      
    } catch (error) {
      console.log(`💥 Error crítico en tests: ${error.message}`);
    }
  }

  // Generar reporte de resultados
  generarReporte(totalTime) {
    console.log('\n📊 === REPORTE FINAL ===');
    
    const exitosos = this.resultados.filter(r => r.estado === 'ÉXITO');
    const fallidos = this.resultados.filter(r => r.estado === 'ERROR');
    
    console.log(`Total de tests: ${this.resultados.length}`);
    console.log(`✅ Exitosos: ${exitosos.length}`);
    console.log(`❌ Fallidos: ${fallidos.length}`);
    console.log(`⏱️ Tiempo total: ${totalTime}ms`);
    console.log(`🎯 Tasa de éxito: ${((exitosos.length / this.resultados.length) * 100).toFixed(1)}%`);
    
    if (fallidos.length > 0) {
      console.log('\n🚨 Tests Fallidos:');
      fallidos.forEach(test => {
        console.log(`   • ${test.nombre}: ${test.error}`);
      });
    }

    console.log('\n📋 Detalle Completo:');
    this.resultados.forEach(test => {
      const icon = test.estado === 'ÉXITO' ? '✅' : '❌';
      console.log(`   ${icon} ${test.nombre} (${test.duracion})`);
    });

    // Retornar resultados para uso programático
    return {
      total: this.resultados.length,
      exitosos: exitosos.length,
      fallidos: fallidos.length,
      tasaExito: (exitosos.length / this.resultados.length) * 100,
      tiempoTotal: totalTime,
      resultados: this.resultados
    };
  }
}

// Función para ejecutar tests desde consola del navegador
window.ejecutarTestsAPI = async () => {
  const tester = new APITester();
  return await tester.ejecutarTodasLasPruebas();
};

// Función para tests individuales
window.testModulo = async (modulo) => {
  const tester = new APITester();
  
  // Primero hacer login
  await tester.testAutenticacion();
  
  switch(modulo.toLowerCase()) {
    case 'finanzas':
      await tester.testFinanzas();
      break;
    case 'seguridad':
      await tester.testSeguridad();
      break;
    case 'mantenimiento':
      await tester.testMantenimiento();
      break;
    case 'usuarios':
      await tester.testUsuarios();
      break;
    default:
      console.log('Módulos disponibles: finanzas, seguridad, mantenimiento, usuarios');
  }
  
  return tester.generarReporte(0);
};

export { APITester, TEST_CONFIG };