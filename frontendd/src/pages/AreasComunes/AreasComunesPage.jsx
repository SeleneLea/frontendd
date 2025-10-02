import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { FaBuilding, FaSwimmingPool, FaDumbbell, FaParking } from 'react-icons/fa';

const AreasComunesPage = () => {
  const areas = [
    { nombre: 'Piscina', icono: FaSwimmingPool, estado: 'Disponible', color: '#2196F3' },
    { nombre: 'Gimnasio', icono: FaDumbbell, estado: 'Ocupado', color: '#FF9800' },
    { nombre: 'Salón Social', icono: FaBuilding, estado: 'Disponible', color: '#4CAF50' },
    { nombre: 'Parqueadero', icono: FaParking, estado: 'Disponible', color: '#9C27B0' }
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
        Áreas Comunes
      </Typography>
      
      <Grid container spacing={3}>
        {areas.map((area, index) => {
          const Icon = area.icono;
          return (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Icon size={48} color={area.color} style={{ marginBottom: 16 }} />
                  <Typography variant="h6" sx={{ mb: 1 }}>{area.nombre}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Estado: {area.estado}
                  </Typography>
                  <Button variant="contained" size="small" fullWidth>
                    Reservar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default AreasComunesPage;