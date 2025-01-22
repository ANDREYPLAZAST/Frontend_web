import React from 'react';
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Avatar
} from '@mui/material';
import '../../css/dashboard/TransactionsTable.css';

const TransactionsTable = () => {
  const transactions = [
    {
      id: 1,
      type: 'receive',
      name: 'From Amey LTD',
      description: 'Bank transfer',
      amount: '+1200.00',
      date: 'Today'
    },
    {
      id: 2,
      type: 'send',
      name: 'To Jerome Bell',
      description: 'Sent to wallet',
      amount: '-500.00',
      date: '09/08/2022'
    }
  ];

  return (
    <Box className="transactions-container">
      <Box className="transactions-header">
        <Typography variant="h6">Transactions</Typography>
        <Typography 
          variant="body2" 
          color="primary" 
          sx={{ cursor: 'pointer' }}
        >
          Show more
        </Typography>
      </Box>

      <TableContainer>
        <Table>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id} className="transaction-row">
                <TableCell>
                  <Box className="transaction-info">
                    <Avatar 
                      className={`transaction-icon ${transaction.type}`}
                    >
                      {transaction.type === 'receive' ? '↓' : '↑'}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2">
                        {transaction.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {transaction.description}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Typography 
                    variant="subtitle2" 
                    className={transaction.amount.startsWith('+') ? 'amount-positive' : 'amount-negative'}
                  >
                    {transaction.amount} EUR
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {transaction.date}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TransactionsTable; 