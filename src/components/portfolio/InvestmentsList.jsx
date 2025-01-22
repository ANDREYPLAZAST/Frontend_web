import React from 'react';
import { Card, Box, Typography, List, ListItem, ListItemText, Chip } from '@mui/material';
import '../../css/portfolio/InvestmentsList.css';

const InvestmentsList = () => {
  const investments = [
    {
      id: 1,
      name: 'Inversión a Plazo Fijo',
      amount: '$10,000.00',
      return: '+4.5%',
      status: 'active',
      dueDate: '2024-06-20'
    },
    {
      id: 2,
      name: 'Fondo Mutuo Conservador',
      amount: '$5,000.00',
      return: '+3.2%',
      status: 'active',
      dueDate: 'N/A'
    },
    {
      id: 3,
      name: 'Inversión en Acciones',
      amount: '$15,000.00',
      return: '+6.8%',
      status: 'active',
      dueDate: 'N/A'
    }
  ];

  return (
    <Card className="investments-list-card">
      <Typography variant="h6" gutterBottom>
        Mis Inversiones
      </Typography>
      <List>
        {investments.map((investment) => (
          <ListItem key={investment.id} className="investment-item">
            <ListItemText
              primary={investment.name}
              secondary={`Vencimiento: ${investment.dueDate}`}
            />
            <Box className="investment-details">
              <Typography variant="subtitle1">
                {investment.amount}
              </Typography>
              <Chip
                label={investment.return}
                color="success"
                size="small"
                className="return-chip"
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default InvestmentsList; 