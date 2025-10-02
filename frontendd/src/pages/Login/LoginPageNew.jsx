import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Container,
  Paper
} from '@mui/material';
import { FaBuilding, FaUser, FaLock } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await login(formData.username, formData.password);
      
      if (result.success) {
        // Redirigir al dashboard
        navigate('/dashboard');
      } else {
        setError(result.error || 'Error de autenticación');
      }
    } catch (error) {
      setError('Error de conexión. Verifica tu conexión a internet.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestLogin = () => {
    setFormData({
      username: 'webadmin',
      password: 'webadmin123'
    });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          py: 4
        }}
      >
        <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: 3,
            width: '100%',
            maxWidth: 400,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                mb: 2
              }}
            >
              <FaBuilding size={40} color="white" />
            </Box>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              Smart Condominium
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sistema de Gestión Inteligente
            </Typography>
          </Box>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {error && (
                <Alert severity="error" sx={{ borderRadius: 2 }}>
                  {error}
                </Alert>
              )}

              <TextField
                fullWidth
                name="username"
                label="Usuario"
                value={formData.username}
                onChange={handleInputChange}
                variant="outlined"
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ mr: 1, color: 'text.secondary' }}>
                      <FaUser />
                    </Box>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />

              <TextField
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                variant="outlined"
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ mr: 1, color: 'text.secondary' }}>
                      <FaLock />
                    </Box>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                  }
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>

              <Button
                type="button"
                fullWidth
                variant="outlined"
                onClick={handleTestLogin}
                disabled={isLoading}
                sx={{
                  py: 1,
                  borderRadius: 2,
                  borderColor: '#667eea',
                  color: '#667eea',
                  '&:hover': {
                    borderColor: '#5a6fd8',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                  }
                }}
              >
                Usar Credenciales de Prueba
              </Button>
            </Box>
          </form>

          {/* Footer */}
          <Box sx={{ textAlign: 'center', mt: 4, pt: 3, borderTop: '1px solid #eee' }}>
            <Typography variant="caption" color="text.secondary">
              Sistema de gestión para condominios inteligentes
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;