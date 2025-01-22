// src/pages/Dashboard.jsx
import React from 'react';
import { Box, Container, Grid, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from '../components/dashboard/Sidebar';
import AccountSummary from '../components/dashboard/AccountSummary';
import TransactionHistory from '../components/dashboard/TransactionHistory';
import FinancialStats from '../components/dashboard/FinancialStats';
import QuickActions from '../components/dashboard/QuickActions';
import "../css/Dashboard.css";

const Dashboard = () => {
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
                balance="$9,050.00"
                savingsGoal="$10,000.00"
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
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
