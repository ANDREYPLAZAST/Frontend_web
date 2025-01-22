import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import '../../css/dashboard/StatisticsChart.css';

const StatisticsChart = () => {
  return (
    <Card className="statistics-card">
      <Box className="statistics-header">
        <Typography variant="h6">Your statistic</Typography>
        <Typography variant="body2">This week</Typography>
      </Box>
      
      <Box className="chart-container">
        {/* Aquí puedes integrar una librería de gráficos como recharts o chart.js */}
        <Box className="placeholder-chart">
          <div className="chart-line"></div>
          <div className="chart-amount">$23,567.00</div>
        </Box>
      </Box>
      
      <Box className="chart-dates">
        <Typography variant="body2">6 Mar</Typography>
        <Typography variant="body2">7 Mar</Typography>
        <Typography variant="body2">8 Mar</Typography>
        <Typography variant="body2">9 Mar</Typography>
        <Typography variant="body2">10 Mar</Typography>
      </Box>
    </Card>
  );
};

export default StatisticsChart; 