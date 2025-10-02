import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Context
import { AuthProvider } from './context/AuthContext';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';

// Pages
import LoginPageNew from './pages/Login/LoginPageNew';
import DashboardPage from './pages/Dashboard/DashboardPage';
import FinanzasPage from './pages/Finanzas/FinanzasPage';
import SeguridadPage from './pages/Seguridad/SeguridadPage';
import MantenimientoPage from './pages/Mantenimiento/MantenimientoPage';
import UsuariosPage from './pages/Usuarios/UsuariosPage';
import AreasComunesPage from './pages/AreasComunes/AreasComunesPage';
import ComunicacionPage from './pages/Comunicacion/ComunicacionPage';
import ReportesPage from './pages/Reportes/ReportesPage';
import ConfiguracionPage from './pages/Configuracion/ConfiguracionPage';
import TestRunnerPage from './pages/TestRunner/TestRunnerPage';

// Tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Ruta pública de login */}
            <Route path="/login" element={<LoginPageNew />} />
            
            {/* Rutas protegidas */}
            <Route path="/" element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              {/* Redirigir la raíz al dashboard */}
              <Route index element={<Navigate to="/dashboard" replace />} />
              
              {/* Páginas principales */}
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="finanzas" element={<FinanzasPage />} />
              <Route path="seguridad" element={<SeguridadPage />} />
              <Route path="mantenimiento" element={<MantenimientoPage />} />
              <Route path="usuarios" element={<UsuariosPage />} />
              <Route path="areas-comunes" element={<AreasComunesPage />} />
              <Route path="comunicacion" element={<ComunicacionPage />} />
              <Route path="reportes" element={<ReportesPage />} />
              <Route path="configuracion" element={<ConfiguracionPage />} />
              
              {/* Página de tests (temporal) */}
              <Route path="tests" element={<TestRunnerPage />} />
            </Route>

            {/* Redirección por defecto */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;