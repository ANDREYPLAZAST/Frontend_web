import React from 'react';
import { Card, Box, Typography, Tab, Tabs } from '@mui/material';
import '../../css/dashboard/FinancialStats.css';

const FinancialStats = () => {
  const [tabValue, setTabValue] = React.useState(0);

  return (
    <Card className="stats-card">
      <Box className="stats-header">
        <Typography variant="h6">Estadísticas Financieras</Typography>
        <Tabs 
          value={tabValue} 
          onChange={(e, newValue) => setTabValue(newValue)}
          className="stats-tabs"
        >
          <Tab label="Semanal" />
          <Tab label="Mensual" />
          <Tab label="Anual" />
        </Tabs>
      </Box>
      
      <Box className="stats-content">
        {/* Aquí irá el gráfico - Por ahora un placeholder */}
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
        
        <Box className="stats-summary">
          <Box className="stat-item">
            <Typography variant="body2">Ingresos</Typography>
            <Typography variant="h6" className="positive">+$2,560.00</Typography>
          </Box>
          <Box className="stat-item">
            <Typography variant="body2">Gastos</Typography>
            <Typography variant="h6" className="negative">-$1,210.00</Typography>
          </Box>
          <Box className="stat-item">
            <Typography variant="body2">Balance</Typography>
            <Typography variant="h6">+$1,350.00</Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default FinancialStats; 