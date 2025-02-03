import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Sidebar from '../components/dashboard/Sidebar';
import FinancialData from '../components/dashboard/FinancialData';
import '../css/pages/Funds.css';

const Funds = () => {
  return (
    <Box className="dashboard-layout">
      <Sidebar />
      <Box className="main-content">
        <Container>
          <Typography variant="h5" className="page-title">
            Consulta de Fondos y Acciones
          </Typography>
          
          <FinancialData />
        </Container>
      </Box>
    </Box>
  );
};

export default Funds; 