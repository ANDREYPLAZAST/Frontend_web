import React from 'react';
import { Box, Typography } from '@mui/material';
import '../../css/dashboard/PortfolioStats.css';

const PortfolioStats = () => {
  return (
    <Box className="portfolio-stats">
      <Box className="stats-header">
        <Typography variant="h6">Portfolio Statistics</Typography>
      </Box>
      
      <Box className="stats-chart">
        <Box className="chart-placeholder">
          <svg width="100%" height="200">
            <path
              d="M0,100 Q50,50 100,80 T200,90 T300,70 T400,85"
              fill="none"
              stroke="#4CAF50"
              strokeWidth="2"
            />
          </svg>
        </Box>
        
        <Box className="chart-labels">
          <Typography>Mon</Typography>
          <Typography>Tue</Typography>
          <Typography>Wed</Typography>
          <Typography>Thu</Typography>
          <Typography>Fri</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PortfolioStats; 