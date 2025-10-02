// Test Runner Page - Smart Condominium
// Página para ejecutar tests de integración desde el navegador

import React, { useState } from 'react';
import { Box, Button, Card, Typography, LinearProgress, Alert } from '@mui/material';
import { FaPlay, FaCheck, FaTimes, FaClock } from 'react-icons/fa';
import { APITester } from "../../tests/apiIntegrationTests";

const TestRunnerPage = () => {
  const [testing, setTesting] = useState(false);
  const [resultados, setResultados] = useState(null);
  const [progreso, setProgreso] = useState(0);

  const ejecutarTests = async () => {
    setTesting(true);
    setProgreso(0);
    setResultados(null);

    try {
      // Usar la función global disponible en window
      if (window.ejecutarTestsAPI) {
        // Simular progreso
        setProgreso(20);
        setTimeout(() => setProgreso(40), 1000);
        setTimeout(() => setProgreso(60), 3000);
        setTimeout(() => setProgreso(80), 5000);
        setTimeout(() => setProgreso(95), 7000);

        const resultadosTests = await window.ejecutarTestsAPI();
        
        setProgreso(100);
        setResultados(resultadosTests);
      } else {
        throw new Error('Sistema de tests no disponible. Recarga la página.');
      }
    } catch (error) {
      console.error('Error ejecutando tests:', error);
      setResultados({
        error: error.message,
        total: 0,
        exitosos: 0,
        fallidos: 1
      });
    } finally {
      setTesting(false);
    }
  };

  const ejecutarTestModulo = async (modulo) => {
    setTesting(true);
    setProgreso(0);
    
    try {
      if (window.testModulo) {
        // Simular progreso para módulo específico
        setProgreso(30);
        setTimeout(() => setProgreso(70), 1000);
        
        const resultado = await window.testModulo(modulo);
        
        setProgreso(100);
        setResultados(resultado);
      } else {
        throw new Error('Sistema de tests no disponible. Recarga la página.');
      }
    } catch (error) {
      console.error(`Error en test de ${modulo}:`, error);
      setResultados({
        error: error.message,
        total: 0,
        exitosos: 0,
        fallidos: 1
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <Box className="test-runner-container" sx={{ p: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          🧪 Test Runner - Smart Condominium
        </Typography>
        <Typography color="textSecondary">
          Verificación de conectividad con API Backend
        </Typography>
      </Box>

      {/* Test Controls */}
      <Card sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          🚀 Ejecutar Tests
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<FaPlay />}
            onClick={ejecutarTests}
            disabled={testing}
            size="large"
          >
            Ejecutar Todos los Tests
          </Button>
          
          <Button
            variant="outlined"
            onClick={() => ejecutarTestModulo('finanzas')}
            disabled={testing}
          >
            Test Finanzas
          </Button>
          
          <Button
            variant="outlined"
            onClick={() => ejecutarTestModulo('seguridad')}
            disabled={testing}
          >
            Test Seguridad
          </Button>
          
          <Button
            variant="outlined"
            onClick={() => ejecutarTestModulo('mantenimiento')}
            disabled={testing}
          >
            Test Mantenimiento
          </Button>
          
          <Button
            variant="outlined"
            onClick={() => ejecutarTestModulo('usuarios')}
            disabled={testing}
          >
            Test Usuarios
          </Button>
        </Box>

        {/* Progress Bar */}
        {testing && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Ejecutando tests... {progreso}%
            </Typography>
            <LinearProgress variant="determinate" value={progreso} />
          </Box>
        )}
      </Card>

      {/* Test Results */}
      {resultados && (
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            📊 Resultados de Tests
          </Typography>
          
          {resultados.error ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              Error crítico: {resultados.error}
            </Alert>
          ) : (
            <>
              {/* Summary */}
              <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">
                    {resultados.total}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total Tests
                  </Typography>
                </Box>
                
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main">
                    {resultados.exitosos}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Exitosos
                  </Typography>
                </Box>
                
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="error.main">
                    {resultados.fallidos}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Fallidos
                  </Typography>
                </Box>
                
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="info.main">
                    {resultados.tasaExito?.toFixed(1)}%
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Tasa Éxito
                  </Typography>
                </Box>
              </Box>

              {/* Status Alert */}
              {resultados.tasaExito > 80 ? (
                <Alert severity="success" sx={{ mb: 2 }}>
                  ✅ Sistema funcionando correctamente - Tasa de éxito: {resultados.tasaExito?.toFixed(1)}%
                </Alert>
              ) : resultados.tasaExito > 50 ? (
                <Alert severity="warning" sx={{ mb: 2 }}>
                  ⚠️ Sistema parcialmente funcional - Algunos endpoints pueden tener problemas
                </Alert>
              ) : (
                <Alert severity="error" sx={{ mb: 2 }}>
                  ❌ Sistema con problemas críticos - Verificar conexión con backend
                </Alert>
              )}

              {/* Detailed Results */}
              {resultados.resultados && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Detalle de Tests:
                  </Typography>
                  
                  {resultados.resultados.map((test, index) => (
                    <Box 
                      key={index}
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 2, 
                        py: 1,
                        borderBottom: '1px solid #eee'
                      }}
                    >
                      {test.estado === 'ÉXITO' ? (
                        <FaCheck color="green" />
                      ) : (
                        <FaTimes color="red" />
                      )}
                      
                      <Typography sx={{ flex: 1 }}>
                        {test.nombre}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FaClock />
                        <Typography variant="body2" color="textSecondary">
                          {test.duracion}
                        </Typography>
                      </Box>
                      
                      {test.error && (
                        <Typography variant="body2" color="error">
                          {test.error}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              )}
            </>
          )}
        </Card>
      )}

      {/* Instructions */}
      <Card sx={{ p: 3, mt: 3, bgcolor: 'info.light', color: 'info.contrastText' }}>
        <Typography variant="h6" gutterBottom>
          📋 Instrucciones
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 2 }}>
          • Asegúrate de que el backend Django esté ejecutándose en http://127.0.0.1:8000
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 2 }}>
          • Los tests verifican conectividad con todos los módulos del sistema
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 2 }}>
          • También puedes ejecutar tests desde la consola del navegador: <code>ejecutarTestsAPI()</code>
        </Typography>
        
        <Typography variant="body2">
          • Para tests individuales: <code>testModulo('finanzas')</code>
        </Typography>
      </Card>
    </Box>
  );
};

export default TestRunnerPage;