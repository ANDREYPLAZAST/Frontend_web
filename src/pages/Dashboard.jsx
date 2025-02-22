// src/pages/Dashboard.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, Grid, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from '../components/dashboard/Sidebar';
import AccountSummary from '../components/dashboard/AccountSummary';
import TransactionHistory from '../components/dashboard/TransactionHistory';
import FinancialStats from '../components/dashboard/FinancialStats';
import QuickActions from '../components/dashboard/QuickActions';
import FinancialData from '../components/dashboard/FinancialData';
import "../css/Dashboard.css";
import "../css/dashboard/DashboardLayout.css";
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  React.useEffect(() => {
    // Agregar clase al body cuando el componente se monta
    document.body.classList.add('dashboard-page');
    
    // Limpiar cuando el componente se desmonta
    return () => {
      document.body.classList.remove('dashboard-page');
    };
  }, []);

  return (
    <Box className="dashboard-layout">
      <Sidebar />
      
      <Box className="main-content">
        <Container>
          {/* Header con búsqueda y notificaciones */}
          <Box className="dashboard-header">
            <h2>Mi Panel Financiero</h2>
            <Box className="header-actions">
              <Box className="search-box">
                <IconButton>
                  <SearchIcon />
                </IconButton>
                <InputBase
                  placeholder="Buscar transacciones..."
                  className="search-input"
                />
              </Box>
            </Box>
          </Box>

          {/* Resumen de Cuenta */}
          <Grid container spacing={3} className="summary-section">
            <Grid item xs={12}>
              <AccountSummary 
                balance={user?.user?.balance || 0}
                savingsGoal={user?.user?.metaAhorro || 0}
                creditLimit="$15,000.00"
                nextPayment={{
                  amount: "$350.12",
                  date: "2024-03-20"
                }}
              />
            </Grid>
          </Grid>

          {/* Contenido Principal */}
          <Box className="content-grid">
            {/* Columna Izquierda */}
            <Box className="main-column">
              <FinancialStats />
              <TransactionHistory />
            </Box>

            {/* Columna Derecha */}
            <Box className="side-column">
              <QuickActions />
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FinancialData />
            </Grid>
          </Grid>

          <Outlet /> {/* Aquí se renderizarán las subrutas */}
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
