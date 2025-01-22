import React from 'react';
import { Card, Box, Typography, Button } from '@mui/material';
import {
  AddCard as CreditIcon,
  AccountBalance as InvestmentIcon,
  Receipt as BillIcon,
  Support as SupportIcon
} from '@mui/icons-material';
import '../../css/dashboard/QuickActions.css';

const QuickActions = () => {
  const actions = [
    {
      icon: <CreditIcon />,
      title: 'Solicitar Crédito',
      description: 'Préstamos personalizados'
    },
    {
      icon: <InvestmentIcon />,
      title: 'Inversiones',
      description: 'Hacer crecer tu dinero'
    },
    {
      icon: <BillIcon />,
      title: 'Pagar Cuota',
      description: 'Gestiona tus pagos'
    },
    {
      icon: <SupportIcon />,
      title: 'Soporte',
      description: '¿Necesitas ayuda?'
    }
  ];

  return (
    <Card className="quick-actions">
      <Typography variant="h6" className="actions-title">
        Acciones Rápidas
      </Typography>
      
      <Box className="actions-grid">
        {actions.map((action, index) => (
          <Button
            key={index}
            className="action-button"
            startIcon={action.icon}
          >
            <Box className="action-content">
              <Typography variant="subtitle2">{action.title}</Typography>
              <Typography variant="caption">{action.description}</Typography>
            </Box>
          </Button>
        ))}
      </Box>
    </Card>
  );
};

export default QuickActions; 