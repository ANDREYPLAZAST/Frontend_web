import React from 'react';
import { Card, Box, Typography, Avatar } from '@mui/material';
import '../../css/dashboard/TransactionsList.css';

const TransactionsList = () => {
  const transactions = [
    {
      id: 1,
      name: 'The Light cafe',
      type: 'Pets shop',
      amount: '$98.45',
      time: '11:00',
      icon: '🐾'
    },
    {
      id: 2,
      name: 'Phone Fixes',
      type: 'Electronic',
      amount: '$899.00',
      time: '10:45',
      icon: '💡'
    }
  ];

  return (
    <Card className="transactions-list-card">
      <Typography variant="h6" className="transactions-title">
        Last spending
      </Typography>

      <Box className="transactions-container">
        {transactions.map((transaction) => (
          <Box key={transaction.id} className="transaction-item">
            <Box className="transaction-info">
              <Avatar className="transaction-icon">
                {transaction.icon}
              </Avatar>
              <Box>
                <Typography variant="subtitle2">{transaction.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {transaction.type}
                </Typography>
              </Box>
            </Box>
            <Box className="transaction-details">
              <Typography variant="subtitle2">{transaction.amount}</Typography>
              <Typography variant="body2" color="textSecondary">
                {transaction.time}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default TransactionsList; 