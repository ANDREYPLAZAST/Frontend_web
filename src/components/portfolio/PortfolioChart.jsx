import React from 'react';
import { Card, Box, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../../css/portfolio/PortfolioChart.css';

const PortfolioChart = () => {
  const data = [
    { date: '2024-01', value: 50000 },
    { date: '2024-02', value: 51200 },
    { date: '2024-03', value: 52500 },
    { date: '2024-04', value: 53800 },
    { date: '2024-05', value: 52900 },
    { date: '2024-06', value: 54200 }
  ];

  return (
    <Card className="portfolio-chart-card">
      <Typography variant="h6" gutterBottom>
        Evolución del Portafolio
      </Typography>
      <Box className="chart-container" style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#4CAF50" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};

export default PortfolioChart; 