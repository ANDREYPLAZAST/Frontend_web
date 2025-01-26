import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, Tooltip } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  AccountBalanceWallet as TransactionIcon,
  ShowChart as PortfolioIcon,
  Inventory as ProductIcon,
  School as LearningIcon,
  Settings as SettingsIcon,
  Help as SupportIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';
import '../../css/dashboard/Sidebar.css';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { 
      icon: <DashboardIcon />, 
      label: 'Dashboard', 
      path: '/dashboard/home',
      description: 'Resumen general de tu cuenta'
    },
    { 
      icon: <TransactionIcon />, 
      label: 'Transacciones',
      path: '/dashboard/transactions',
      description: 'Historial de movimientos y transferencias'
    },
    { 
      icon: <PortfolioIcon />, 
      label: 'Portafolio',
      path: '/dashboard/portfolio',
      description: 'Gestión de inversiones y rendimientos'
    },
    { 
      icon: <ProductIcon />, 
      label: 'Productos',
      path: '/dashboard/products',
      description: 'Créditos, ahorros y servicios disponibles'
    },
    { 
      icon: <LearningIcon />, 
      label: 'Educación Financiera',
      path: '/dashboard/learning',
      description: 'Aprende sobre finanzas personales'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box className="sidebar">
      {/* Perfil de Usuario */}
      <Box className="profile-info">
        <Avatar 
          key={user?.profileImage}
          className="profile-avatar"
          src={user?.profileImage || '/default-avatar.jpg'}
          alt={`${user?.nombre} ${user?.apellido}`}
        />
        <Box className="profile-details">
          <Typography className="profile-name">
            {user?.nombre} {user?.apellido}
          </Typography>
          <Typography className="profile-email">
            {user?.email}
          </Typography>
        </Box>
      </Box>

      {/* Menú Principal */}
      <Typography variant="body2" className="menu-label">Menú Principal</Typography>
      <List className="menu-list">
        {menuItems.map((item) => (
          <Tooltip 
            key={item.label}
            title={item.description}
            placement="right"
          >
            <ListItem 
              onClick={() => handleNavigation(item.path)}
              className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <ListItemIcon className="menu-icon">
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label}
                className="menu-text"
              />
            </ListItem>
          </Tooltip>
        ))}
      </List>

      {/* Soporte y Configuración */}
      <Box className="bottom-menu">
        <ListItem 
          className="menu-item"
          onClick={() => handleNavigation('/dashboard/support')}
        >
          <ListItemIcon className="menu-icon">
            <SupportIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Soporte"
            className="menu-text"
          />
        </ListItem>

        <ListItem 
          className="menu-item"
          onClick={() => handleNavigation('/dashboard/settings')}
        >
          <ListItemIcon className="menu-icon">
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Configuración"
            className="menu-text"
          />
        </ListItem>

        {/* Botón de Cerrar Sesión */}
        <ListItem 
          className="menu-item logout-item"
          onClick={handleLogout}
        >
          <ListItemIcon className="menu-icon">
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Cerrar Sesión"
            className="menu-text"
          />
        </ListItem>
      </Box>
    </Box>
  );
};

export default Sidebar; 