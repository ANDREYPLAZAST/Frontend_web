import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import Sidebar from '../components/dashboard/Sidebar';
import PortfolioSummary from '../components/portfolio/PortfolioSummary';
import InvestmentsList from '../components/portfolio/InvestmentsList';
import PortfolioChart from '../components/portfolio/PortfolioChart';
import '../css/pages/Portfolio.css';

const Portfolio = () => {
  return (
    <Box className="dashboard-layout">
      <Sidebar />
      <Box className="main-content">
        <Container>
          <Typography variant="h5" className="page-title">
            Mi Portafolio
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <PortfolioSummary />
            </Grid>

            <Grid item xs={12} md={8}>
              <PortfolioChart />
            </Grid>

            <Grid item xs={12} md={4}>
              <InvestmentsList />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Portfolio; 