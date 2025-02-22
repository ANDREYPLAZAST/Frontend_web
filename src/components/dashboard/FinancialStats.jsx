import React, { useState, useEffect } from 'react';
import { Card, Box, Typography, Tab, Tabs } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { getTransactions } from '../../services/api';
import '../../css/dashboard/FinancialStats.css';

const FinancialStats = () => {
  const [tabValue, setTabValue] = useState(0);
  const [stats, setStats] = useState({
    ingresos: 0,
    gastos: 0,
    balance: 0,
    chartData: []
  });

  const calcularEstadisticasPeriodo = (transactions, startDate) => {
    const transaccionesFiltradas = transactions.filter(t => 
      new Date(t.fecha) >= startDate && new Date(t.fecha) <= new Date()
    );

    const totales = transaccionesFiltradas.reduce((acc, trans) => {
      if (trans.tipo === 'ingreso') {
        acc.ingresos += Number(trans.monto);
      } else {
        acc.gastos += Number(trans.monto);
      }
      return acc;
    }, { ingresos: 0, gastos: 0 });

    return {
      ingresos: totales.ingresos,
      gastos: totales.gastos,
      balance: totales.ingresos - totales.gastos
    };
  };

  const processTransactionsForChart = (transactions, period) => {
    const now = new Date();
    let startDate = new Date();
    let dateFormat;
    
    switch(period) {
      case 0: // Semanal
        startDate.setDate(now.getDate() - 7);
        dateFormat = { weekday: 'short', month: 'short', day: 'numeric' };
        break;
      case 1: // Mensual
        startDate.setMonth(now.getMonth() - 1);
        dateFormat = { month: 'short', day: 'numeric' };
        break;
      case 2: // Anual
        startDate.setFullYear(now.getFullYear() - 1);
        dateFormat = { month: 'short', year: 'numeric' };
        break;
      default:
        startDate.setDate(now.getDate() - 7);
        dateFormat = { weekday: 'short', month: 'short', day: 'numeric' };
    }

    const filteredTransactions = transactions.filter(t => 
      new Date(t.fecha) >= startDate && new Date(t.fecha) <= now
    );

    // Crear array de fechas para el período
    const dates = [];
    let currentDate = new Date(startDate);
    
    while (currentDate <= now) {
      dates.push(new Date(currentDate));
      switch(period) {
        case 0: // Semanal
          currentDate.setDate(currentDate.getDate() + 1);
          break;
        case 1: // Mensual
          currentDate.setDate(currentDate.getDate() + 2);
          break;
        case 2: // Anual
          currentDate.setMonth(currentDate.getMonth() + 1);
          break;
      }
    }

    // Crear datos para cada fecha
    return dates.map(date => {
      const dayTransactions = filteredTransactions.filter(t => {
        const transDate = new Date(t.fecha);
        return period === 2 
          ? transDate.getMonth() === date.getMonth() && transDate.getFullYear() === date.getFullYear()
          : transDate.toDateString() === date.toDateString();
      });

      const dayStats = dayTransactions.reduce((acc, trans) => {
        if (trans.tipo === 'ingreso') {
          acc.ingresos += Number(trans.monto);
        } else {
          acc.gastos += Number(trans.monto);
        }
        return acc;
      }, { ingresos: 0, gastos: 0 });

      return {
        date: date.toLocaleDateString('es-ES', dateFormat),
        ingresos: dayStats.ingresos,
        gastos: dayStats.gastos,
        balance: dayStats.ingresos - dayStats.gastos
      };
    });
  };

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await getTransactions();
        const transactions = response.data;
        
        // Obtener fecha inicial según el período
        const now = new Date();
        let startDate = new Date();
        
        switch(tabValue) {
          case 0: // Semanal
            startDate.setDate(now.getDate() - 7);
            break;
          case 1: // Mensual
            startDate.setMonth(now.getMonth() - 1);
            break;
          case 2: // Anual
            startDate.setFullYear(now.getFullYear() - 1);
            break;
        }

        // Calcular estadísticas del período seleccionado
        const periodStats = calcularEstadisticasPeriodo(transactions, startDate);
        
        // Preparar datos para la gráfica
        const chartData = processTransactionsForChart(transactions, tabValue);

        setStats({
          ...periodStats,
          chartData
        });
      } catch (error) {
        console.error('Error cargando estadísticas:', error);
      }
    };

    loadStats();
  }, [tabValue]);

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
        <Box className="chart-container" style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date"
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="ingresos" 
                stroke="#4CAF50" 
                name="Ingresos"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="gastos" 
                stroke="#f44336" 
                name="Gastos"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="balance" 
                stroke="#2196F3" 
                name="Balance"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
        
        <Box className="stats-summary">
          <Box className="stat-item">
            <Typography variant="body2">Ingresos del período</Typography>
            <Typography variant="h6" className="positive">
              +${stats.ingresos.toFixed(2)}
            </Typography>
          </Box>
          <Box className="stat-item">
            <Typography variant="body2">Gastos del período</Typography>
            <Typography variant="h6" className="negative">
              -${stats.gastos.toFixed(2)}
            </Typography>
          </Box>
          <Box className="stat-item">
            <Typography variant="body2">Balance del período</Typography>
            <Typography variant="h6" className={stats.balance >= 0 ? 'positive' : 'negative'}>
              ${stats.balance.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default FinancialStats; 