import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FaUsers, FaUserPlus, FaUserEdit } from 'react-icons/fa';

const UsuariosPage = () => {
  const usuarios = [
    { id: 1, nombre: 'Juan Pérez', apartamento: '101', tipo: 'Propietario', estado: 'Activo' },
    { id: 2, nombre: 'María García', apartamento: '205', tipo: 'Arrendatario', estado: 'Activo' },
    { id: 3, nombre: 'Carlos López', apartamento: '302', tipo: 'Propietario', estado: 'Inactivo' }
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
        Gestión de Usuarios
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>Lista de Residentes</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nombre</TableCell>
                      <TableCell>Apartamento</TableCell>
                      <TableCell>Tipo</TableCell>
                      <TableCell>Estado</TableCell>
                      <TableCell>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {usuarios.map((usuario) => (
                      <TableRow key={usuario.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar>{usuario.nombre[0]}</Avatar>
                            {usuario.nombre}
                          </Box>
                        </TableCell>
                        <TableCell>{usuario.apartamento}</TableCell>
                        <TableCell>{usuario.tipo}</TableCell>
                        <TableCell>{usuario.estado}</TableCell>
                        <TableCell>
                          <Button size="small" variant="outlined">
                            Editar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>Acciones</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button variant="contained" startIcon={<FaUserPlus />} fullWidth>
                  Agregar Usuario
                </Button>
                <Button variant="outlined" startIcon={<FaUserEdit />} fullWidth>
                  Editar Permisos
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UsuariosPage;