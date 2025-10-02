import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  IconButton
} from '@mui/material';
import {
  FaDollarSign,
  FaChartLine,
  FaFileInvoiceDollar,
  FaExclamationTriangle,
  FaCheckCircle,
  FaEye,
  FaDownload
} from 'react-icons/fa';

const FinanzasPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('mes');

  // Datos de ejemplo
  const financialSummary = {
    ingresos: 125000,
    gastos: 89000,
    pendientes: 15000,
    balance: 36000
  };

  const recentTransactions = [
    {
      id: 1,
      concepto: 'Cuota administración - Apt 101',
      monto: 250000,
      tipo: 'ingreso',
      fecha: '2025-10-01',
      estado: 'completado'
    },
    {
      id: 2,
      concepto: 'Mantenimiento ascensores',
      monto: -45000,
      tipo: 'gasto',
      fecha: '2025-09-30',
      estado: 'completado'
    },
    {
      id: 3,
      concepto: 'Cuota administración - Apt 205',
      monto: 250000,
      tipo: 'ingreso',
      fecha: '2025-09-28',
      estado: 'pendiente'
    },
    {
      id: 4,
      concepto: 'Servicios públicos',
      monto: -180000,
      tipo: 'gasto',
      fecha: '2025-09-25',
      estado: 'completado'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(Math.abs(amount));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completado': return 'success';
      case 'pendiente': return 'warning';
      case 'vencido': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completado': return 'Completado';
      case 'pendiente': return 'Pendiente';
      case 'vencido': return 'Vencido';
      default: return status;
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          Gestión Financiera
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Controla los ingresos, gastos y estado financiero del condominio
        </Typography>
      </Box>

      {/* Resumen financiero */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: '#E8F5E8', color: '#4CAF50', mr: 2 }}>
                  <FaDollarSign />
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#4CAF50' }}>
                    {formatCurrency(financialSummary.ingresos)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ingresos
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: '#FFEBEE', color: '#F44336', mr: 2 }}>
                  <FaChartLine />
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#F44336' }}>
                    {formatCurrency(financialSummary.gastos)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Gastos
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: '#FFF3E0', color: '#FF9800', mr: 2 }}>
                  <FaExclamationTriangle />
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#FF9800' }}>
                    {formatCurrency(financialSummary.pendientes)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pendientes
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: '#E3F2FD', color: '#2196F3', mr: 2 }}>
                  <FaFileInvoiceDollar />
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2196F3' }}>
                    {formatCurrency(financialSummary.balance)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Balance
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Transacciones recientes */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Transacciones Recientes
                </Typography>
                <Button variant="outlined" startIcon={<FaDownload />}>
                  Exportar
                </Button>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Concepto</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Monto</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Fecha</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.concepto}</TableCell>
                        <TableCell>
                          <Typography
                            sx={{
                              color: transaction.tipo === 'ingreso' ? '#4CAF50' : '#F44336',
                              fontWeight: 'medium'
                            }}
                          >
                            {transaction.tipo === 'ingreso' ? '+' : '-'}
                            {formatCurrency(transaction.monto)}
                          </Typography>
                        </TableCell>
                        <TableCell>{transaction.fecha}</TableCell>
                        <TableCell>
                          <Chip
                            label={getStatusText(transaction.estado)}
                            color={getStatusColor(transaction.estado)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton size="small" color="primary">
                            <FaEye />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Panel de acciones */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                Acciones Rápidas
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button 
                  variant="contained" 
                  startIcon={<FaFileInvoiceDollar />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Generar Factura
                </Button>
                <Button 
                  variant="contained" 
                  startIcon={<FaDollarSign />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Registrar Pago
                </Button>
                <Button 
                  variant="contained" 
                  startIcon={<FaChartLine />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Ver Reportes
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<FaDownload />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Exportar Datos
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Estado de cobros */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                Estado de Cobros
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Al día</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>85%</Typography>
                </Box>
                <Box sx={{ width: '100%', bgcolor: '#f0f0f0', borderRadius: 1, height: 8 }}>
                  <Box 
                    sx={{ 
                      width: '85%', 
                      bgcolor: '#4CAF50', 
                      borderRadius: 1, 
                      height: 8 
                    }} 
                  />
                </Box>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Pendientes</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>12%</Typography>
                </Box>
                <Box sx={{ width: '100%', bgcolor: '#f0f0f0', borderRadius: 1, height: 8 }}>
                  <Box 
                    sx={{ 
                      width: '12%', 
                      bgcolor: '#FF9800', 
                      borderRadius: 1, 
                      height: 8 
                    }} 
                  />
                </Box>
              </Box>

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Vencidos</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>3%</Typography>
                </Box>
                <Box sx={{ width: '100%', bgcolor: '#f0f0f0', borderRadius: 1, height: 8 }}>
                  <Box 
                    sx={{ 
                      width: '3%', 
                      bgcolor: '#F44336', 
                      borderRadius: 1, 
                      height: 8 
                    }} 
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FinanzasPage;