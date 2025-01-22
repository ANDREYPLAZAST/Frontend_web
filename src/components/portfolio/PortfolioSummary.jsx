import React from 'react';
import { Card, Box, Typography, Grid } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import '../../css/portfolio/PortfolioSummary.css';

const PortfolioSummary = () => {
  return (
    <Card className="portfolio-summary-card">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box className="summary-item">
            <Typography variant="subtitle2" color="textSecondary">
              Total Invertido
            </Typography>
            <Typography variant="h4">
              $50,000.00
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box className="summary-item">
            <Typography variant="subtitle2" color="textSecondary">
              Rendimiento Total
            </Typography>
            <Box className="trend-value positive">
              <TrendingUp />
              <Typography variant="h4">
                +$2,500.00
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box className="summary-item">
            <Typography variant="subtitle2" color="textSecondary">
              Rendimiento Mensual
            </Typography>
            <Box className="trend-value positive">
              <TrendingUp />
              <Typography variant="h4">
                +5.2%
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PortfolioSummary; 