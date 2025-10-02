import React, { useState } from 'react';
import { Box, Button, Card, TextField, Typography, CircularProgress } from '@mui/material';
import { FaBuilding, FaSignInAlt, FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Usar el servicio de autenticación actualizado
            const result = await authService.login(username, password);

            if (result.success) {
                // Si la autenticación es exitosa
                console.log('Authentication successful:', result);
                alert(result.message);
                
                // Redirigir al dashboard (por ahora a tests)
                navigate('/tests');
            } else {
                // Mostrar error del servicio
                setError(result.error);
            }

        } catch (err) {
            // Manejo de errores inesperados
            setError('Error inesperado. Por favor, inténtelo de nuevo.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Función para navegar a tests (temporal)
    const goToTests = () => {
        navigate('/tests');
    };

    return (
        <Box className="login-container">
            <Card className="login-card">
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <FaBuilding /> Smart Condominium
                    </Typography>
                    <Typography color="textSecondary">
                        Sistema de Gestión Inteligente
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Usuario"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        label="Contraseña"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && (
                        <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
                            {error}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        disabled={loading}
                        sx={{ mt: 2, py: 1.5 }}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <FaSignInAlt />}
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </Button>
                </form>

                {/* Botón temporal para ir directamente a tests */}
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Button
                        variant="outlined"
                        onClick={goToTests}
                        startIcon={<FaCog />}
                        size="small"
                    >
                        Ir a Tests API
                    </Button>
                </Box>

                {/* Información de usuarios de prueba */}
                <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1, fontWeight: 'bold' }}>
                        👥 Usuarios de Prueba:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
                        <strong>Admin:</strong> admin / admin123<br />
                        <strong>Residente:</strong> residente1 / isaelOrtiz2<br />
                        <strong>Seguridad:</strong> seguridad1 / guardia123
                    </Typography>
                </Box>
            </Card>
        </Box>
    );
};

export default LoginPage;