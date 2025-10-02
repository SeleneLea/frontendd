import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, Chip } from '@mui/material';
import { FaTools, FaWrench, FaCalendarAlt } from 'react-icons/fa';

const MantenimientoPage = () => {
  const solicitudes = [
    { id: 1, titulo: 'Reparación ascensor', estado: 'En progreso', prioridad: 'Alta' },
    { id: 2, titulo: 'Pintura fachada', estado: 'Pendiente', prioridad: 'Media' },
    { id: 3, titulo: 'Limpieza piscina', estado: 'Completado', prioridad: 'Baja' }
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
        Mantenimiento
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>Solicitudes de Mantenimiento</Typography>
              {solicitudes.map((solicitud) => (
                <Box key={solicitud.id} sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle1">{solicitud.titulo}</Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip label={solicitud.estado} size="small" />
                      <Chip label={solicitud.prioridad} size="small" color="secondary" />
                    </Box>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>Acciones Rápidas</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button variant="contained" startIcon={<FaTools />} fullWidth>
                  Nueva Solicitud
                </Button>
                <Button variant="outlined" startIcon={<FaCalendarAlt />} fullWidth>
                  Programar Mantenimiento
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MantenimientoPage;