import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, Alert } from '@mui/material';
import { FaShieldAlt, FaCamera, FaUserShield, FaExclamationTriangle } from 'react-icons/fa';

const SeguridadPage = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
        Seguridad y Monitoreo
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <FaCamera size={24} style={{ marginRight: 16, color: '#2196F3' }} />
                <Typography variant="h6">Cámaras de Seguridad</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Monitoreo en tiempo real de las áreas comunes
              </Typography>
              <Button variant="contained" fullWidth>
                Ver Cámaras
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <FaUserShield size={24} style={{ marginRight: 16, color: '#4CAF50' }} />
                <Typography variant="h6">Control de Acceso</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Gestión de visitantes y residentes
              </Typography>
              <Button variant="contained" fullWidth>
                Gestionar Accesos
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              Sistema de seguridad funcionando correctamente. Última actualización: hace 5 minutos
            </Typography>
          </Alert>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SeguridadPage;