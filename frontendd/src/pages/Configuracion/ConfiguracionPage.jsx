import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Switch, FormControlLabel, Button } from '@mui/material';
import { FaCog, FaBell, FaShieldAlt, FaSave } from 'react-icons/fa';

const ConfiguracionPage = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
        Configuración del Sistema
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>Notificaciones</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Notificaciones por email"
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Alertas de seguridad"
                />
                <FormControlLabel
                  control={<Switch />}
                  label="Recordatorios de pago"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>Seguridad</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Autenticación de dos factores"
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Logs de actividad"
                />
                <Button variant="outlined" startIcon={<FaShieldAlt />}>
                  Cambiar Contraseña
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button variant="contained" startIcon={<FaSave />} size="large">
              Guardar Configuración
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConfiguracionPage;