import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { FaChartBar, FaFileDownload, FaCalendarAlt } from 'react-icons/fa';

const ReportesPage = () => {
  const reportes = [
    { nombre: 'Reporte Financiero', descripcion: 'Estado financiero mensual', tipo: 'Finanzas' },
    { nombre: 'Reporte de Seguridad', descripcion: 'Incidentes y monitoreo', tipo: 'Seguridad' },
    { nombre: 'Reporte de Mantenimiento', descripcion: 'Solicitudes y trabajos realizados', tipo: 'Mantenimiento' }
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
        Reportes y Estadísticas
      </Typography>
      
      <Grid container spacing={3}>
        {reportes.map((reporte, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>{reporte.nombre}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {reporte.descripcion}
                </Typography>
                <Typography variant="caption" sx={{ mb: 3, display: 'block' }}>
                  Tipo: {reporte.tipo}
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<FaFileDownload />} 
                  fullWidth
                  size="small"
                >
                  Descargar
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ReportesPage;