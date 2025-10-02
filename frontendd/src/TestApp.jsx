import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function TestApp() {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
        gap: 2
      }}
    >
      <Typography variant="h3" color="primary">
        🏢 Smart Condominium
      </Typography>
      <Typography variant="h5" color="text.secondary">
        Sistema funcionando correctamente ✅
      </Typography>
      <Button 
        variant="contained" 
        color="primary"
        onClick={() => alert('¡Material-UI funciona!')}
      >
        Probar Material-UI
      </Button>
    </Box>
  );
}

export default TestApp;