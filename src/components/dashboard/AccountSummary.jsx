import React from 'react';
import { Card, Box, Typography, LinearProgress, Button } from '@mui/material';
import { 
  AccountBalance as AccountIcon,
  TrendingUp as InvestmentIcon,
  CreditCard as CreditIcon,
  CalendarToday as CalendarIcon 
} from '@mui/icons-material';
import '../../css/dashboard/AccountSummary.css';

const AccountSummary = ({ balance, savingsGoal, creditLimit, nextPayment }) => {
  const savingsProgress = (parseFloat(balance) / parseFloat(savingsGoal)) * 100;

  return (
    <Card className="account-summary">
      <Box className="summary-grid">
        {/* Balance Total */}
        <Box className="summary-item">
          <Box className="summary-header">
            <AccountIcon />
            <Typography variant="subtitle2">Balance Total</Typography>
          </Box>
          <Typography variant="h4">{balance}</Typography>
          <Box className="savings-progress">
            <Typography variant="body2">
              Meta de ahorro: {savingsGoal}
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={savingsProgress} 
              className="progress-bar"
            />
          </Box>
        </Box>

        {/* Crédito Disponible */}
        <Box className="summary-item">
          <Box className="summary-header">
            <CreditIcon />
            <Typography variant="subtitle2">Crédito Disponible</Typography>
          </Box>
          <Typography variant="h4">{creditLimit}</Typography>
          <Button variant="outlined" className="action-button">
            Solicitar Crédito
          </Button>
        </Box>

        {/* Próximo Pago */}
        <Box className="summary-item">
          <Box className="summary-header">
            <CalendarIcon />
            <Typography variant="subtitle2">Próximo Pago</Typography>
          </Box>
          <Typography variant="h4">{nextPayment.amount}</Typography>
          <Typography variant="body2" color="textSecondary">
            Fecha: {nextPayment.date}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default AccountSummary; 