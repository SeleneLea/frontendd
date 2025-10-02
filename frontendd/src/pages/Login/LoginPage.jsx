
import React, { useState } from 'react';
import { Box, Button, Card, TextField, Typography, CircularProgress } from '@mui/material';
import { FaBuilding, FaSignInAlt } from 'react-icons/fa';
import axios from 'axios';

// La URL base de tu backend. Asegúrate de que tu backend esté corriendo.
const API_URL = 'http://127.0.0.1:8000'; 

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Hacemos la llamada a la API que vi en tu backend (Django Simple JWT)
            const response = await axios.post(`${API_URL}/api/token/`, {
                username,
                password,
            });

            // Si la autenticación es exitosa, el backend devuelve tokens.
            // Por ahora, solo mostraremos un alert.
            console.log('Authentication successful:', response.data);
            alert('¡Inicio de sesión exitoso!');
            
            // Aquí guardaríamos los tokens (lo veremos después)
            // localStorage.setItem('accessToken', response.data.access);
            // localStorage.setItem('refreshToken', response.data.refresh);

        } catch (err) {
            // Manejo de errores
            if (err.response && err.response.status === 401) {
                setError('Credenciales incorrectas. Por favor, inténtelo de nuevo.');
            } else {
                setError('Error de conexión con el servidor. ¿El backend está funcionando?');
                console.error('Login error:', err);
            }
        } finally {
            setLoading(false);
        }
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
            </Card>
        </Box>
    );
};

export default LoginPage;