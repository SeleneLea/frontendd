import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Tooltip
} from '@mui/material';
import {
  FaHome,
  FaDollarSign,
  FaShieldAlt,
  FaTools,
  FaUsers,
  FaBuilding,
  FaComments,
  FaChartBar,
  FaCog,
  FaBars,
  FaBell,
  FaSignOutAlt,
  FaUser
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 280;

const menuItems = [
  { text: 'Dashboard', path: '/dashboard', icon: FaHome, color: '#2196F3' },
  { text: 'Finanzas', path: '/finanzas', icon: FaDollarSign, color: '#4CAF50' },
  { text: 'Seguridad', path: '/seguridad', icon: FaShieldAlt, color: '#FF9800' },
  { text: 'Mantenimiento', path: '/mantenimiento', icon: FaTools, color: '#9C27B0' },
  { text: 'Usuarios', path: '/usuarios', icon: FaUsers, color: '#F44336' },
  { text: 'Áreas Comunes', path: '/areas-comunes', icon: FaBuilding, color: '#00BCD4' },
  { text: 'Comunicación', path: '/comunicacion', icon: FaComments, color: '#FF5722' },
  { text: 'Reportes', path: '/reportes', icon: FaChartBar, color: '#607D8B' },
  { text: 'Configuración', path: '/configuracion', icon: FaCog, color: '#795548' },
];

const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleProfileMenuClose();
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false); // Cerrar drawer en móvil
  };

  const drawer = (
    <Box>
      {/* Logo y título */}
      <Box
        sx={{
          p: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            mb: 2
          }}
        >
          <FaBuilding size={30} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Smart Condominium
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          Sistema de Gestión
        </Typography>
      </Box>

      <Divider />

      {/* Menú de navegación */}
      <List sx={{ px: 2, py: 1 }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  background: isActive ? `${item.color}15` : 'transparent',
                  border: isActive ? `2px solid ${item.color}30` : '2px solid transparent',
                  '&:hover': {
                    background: `${item.color}10`,
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Icon 
                    size={20} 
                    color={isActive ? item.color : '#666'} 
                  />
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? item.color : 'inherit'
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <FaBars />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {menuItems.find(item => item.path === location.pathname)?.text || 'Dashboard'}
          </Typography>

          {/* Notificaciones */}
          <Tooltip title="Notificaciones">
            <IconButton color="inherit" sx={{ mr: 1 }}>
              <Badge badgeContent={3} color="error">
                <FaBell />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Perfil de usuario */}
          <Tooltip title="Perfil de usuario">
            <IconButton
              onClick={handleProfileMenuOpen}
              sx={{ p: 0 }}
            >
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white'
                }}
              >
                {user?.first_name?.[0] || user?.username?.[0] || 'U'}
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            onClick={handleProfileMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={() => navigate('/perfil')}>
              <FaUser style={{ marginRight: 8 }} />
              Mi Perfil
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <FaSignOutAlt style={{ marginRight: 8 }} />
              Cerrar Sesión
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: '1px solid #e0e0e0'
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          background: '#f5f5f5'
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;