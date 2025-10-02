import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  LinearProgress,
  Alert
} from '@mui/material';
import {
  FaHome,
  FaDollarSign,
  FaShieldAlt,
  FaTools,
  FaUsers,
  FaChartLine,
  FaExclamationTriangle,
  FaCheckCircle,
  FaNetworkWired
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    residents: 0,
    financialHealth: 0,
    securityAlerts: 0,
    maintenanceRequests: 0
  });

  // Datos de ejemplo para el dashboard
  const quickStats = [
    {
      title: 'Residentes Activos',
      value: '248',
      change: '+12',
      icon: FaUsers,
      color: '#2196F3',
      bg: '#E3F2FD'
    },
    {
      title: 'Salud Financiera',
      value: '87%',
      change: '+5%',
      icon: FaDollarSign,
      color: '#4CAF50',
      bg: '#E8F5E8'
    },
    {
      title: 'Alertas de Seguridad',
      value: '3',
      change: '-2',
      icon: FaShieldAlt,
      color: '#FF9800',
      bg: '#FFF3E0'
    },
    {
      title: 'Solicitudes Mantenimiento',
      value: '15',
      change: '+3',
      icon: FaTools,
      color: '#9C27B0',
      bg: '#F3E5F5'
    }
  ];

  const recentActivity = [
    {
      type: 'maintenance',
      title: 'Reparación ascensor Bloque A',
      status: 'En progreso',
      time: 'Hace 2 horas',
      priority: 'alta'
    },
    {
      type: 'security',
      title: 'Acceso registrado visitante',
      status: 'Completado',
      time: 'Hace 4 horas',
      priority: 'normal'
    },
    {
      type: 'financial',
      title: 'Pago cuota administración',
      status: 'Pendiente',
      time: 'Hace 1 día',
      priority: 'media'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completado': return 'success';
      case 'En progreso': return 'warning';
      case 'Pendiente': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'alta': return '#f44336';
      case 'media': return '#ff9800';
      case 'normal': return '#4caf50';
      default: return '#757575';
    }
  };

  return (
    <Box>
      {/* Header de bienvenida */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          ¡Bienvenido de vuelta, {user?.first_name || user?.username || 'Administrador'}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Aquí tienes un resumen de la actividad de tu condominio
        </Typography>
      </Box>

      {/* Estadísticas rápidas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: stat.bg,
                        color: stat.color,
                        mr: 2,
                        width: 50,
                        height: 50
                      }}
                    >
                      <Icon size={24} />
                    </Avatar>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', color: stat.color }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.title}
                      </Typography>
                    </Box>
                  </Box>
                  <Chip 
                    label={stat.change}
                    size="small"
                    color={stat.change.startsWith('+') ? 'success' : 'error'}
                    variant="outlined"
                  />
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Grid container spacing={3}>
        {/* Actividad reciente */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                Actividad Reciente
              </Typography>
              {recentActivity.map((activity, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    p: 2, 
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    mb: 2,
                    '&:last-child': { mb: 0 }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                      {activity.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip 
                        label={activity.status}
                        size="small"
                        color={getStatusColor(activity.status)}
                        variant="outlined"
                      />
                      <Box 
                        sx={{ 
                          width: 8, 
                          height: 8, 
                          borderRadius: '50%',
                          bgcolor: getPriorityColor(activity.priority),
                          alignSelf: 'center'
                        }}
                      />
                    </Box>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {activity.time}
                  </Typography>
                </Box>
              ))}
              <Button 
                variant="outlined" 
                fullWidth 
                sx={{ mt: 2 }}
              >
                Ver toda la actividad
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Panel de acciones rápidas */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                Acciones Rápidas
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button 
                  variant="contained" 
                  startIcon={<FaUsers />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Gestionar Residentes
                </Button>
                <Button 
                  variant="contained" 
                  startIcon={<FaDollarSign />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Ver Finanzas
                </Button>
                <Button 
                  variant="contained" 
                  startIcon={<FaTools />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Nueva Solicitud
                </Button>
                <Button 
                  variant="contained" 
                  startIcon={<FaChartLine />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Generar Reporte
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<FaNetworkWired />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                  onClick={() => navigate('/connectivity-test')}
                >
                  Test de Conectividad
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Alertas importantes */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                Alertas Importantes
              </Typography>
              <Alert severity="warning" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  3 cuotas de administración pendientes
                </Typography>
              </Alert>
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  Mantenimiento programado para mañana
                </Typography>
              </Alert>
              <Alert severity="success">
                <Typography variant="body2">
                  Sistema de seguridad funcionando correctamente
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;