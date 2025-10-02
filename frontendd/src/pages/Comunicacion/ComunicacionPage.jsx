import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, List, ListItem, ListItemText } from '@mui/material';
import { FaComments, FaBullhorn, FaEnvelope } from 'react-icons/fa';

const ComunicacionPage = () => {
  const comunicados = [
    { titulo: 'Mantenimiento programado', fecha: '2025-10-01', tipo: 'Información' },
    { titulo: 'Nueva política de mascotas', fecha: '2025-09-28', tipo: 'Normativa' },
    { titulo: 'Celebración día del niño', fecha: '2025-09-25', tipo: 'Evento' }
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
        Comunicación
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>Comunicados Recientes</Typography>
              <List>
                {comunicados.map((comunicado, index) => (
                  <ListItem key={index} divider>
                    <ListItemText
                      primary={comunicado.titulo}
                      secondary={`${comunicado.tipo} - ${comunicado.fecha}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>Acciones</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button variant="contained" startIcon={<FaBullhorn />} fullWidth>
                  Nuevo Comunicado
                </Button>
                <Button variant="outlined" startIcon={<FaEnvelope />} fullWidth>
                  Enviar Mensaje
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ComunicacionPage;