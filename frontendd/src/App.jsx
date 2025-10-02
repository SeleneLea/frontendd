import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import TestRunnerPage from './pages/TestRunner/TestRunnerPage';

function App() {
  // Por ahora, sistema simple de routing
  // Aquí tendremos la lógica para mostrar el Dashboard después del login
  
  return (
    <Router>
      <Routes>
        {/* Ruta principal - redirige al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Página de login */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Página de tests para verificar API (temporal) */}
        <Route path="/tests" element={<TestRunnerPage />} />
        
        {/* Rutas futuras del sistema */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/usuarios" element={<Usuarios />} /> */}
        {/* <Route path="/finanzas" element={<Finanzas />} /> */}
        {/* <Route path="/seguridad" element={<Seguridad />} /> */}
        {/* <Route path="/mantenimiento" element={<Mantenimiento />} /> */}
        
        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;