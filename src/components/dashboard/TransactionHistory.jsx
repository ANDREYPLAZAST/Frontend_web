import React from 'react';
import { 
  Card, 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip
} from '@mui/material';
import '../../css/dashboard/TransactionHistory.css';

const TransactionHistory = () => {
  const transactions = [
    {
      id: 1,
      type: 'deposit',
      description: 'Depósito de Ahorro',
      amount: '+$1,200.00',
      date: '15 Mar 2024',
      status: 'completed'
    },
    {
      id: 2,
      type: 'payment',
      description: 'Pago de Préstamo',
      amount: '-$350.12',
      date: '14 Mar 2024',
      status: 'completed'
    },
    {
      id: 3,
      type: 'transfer',
      description: 'Transferencia recibida',
      amount: '+$500.00',
      date: '13 Mar 2024',
      status: 'completed'
    }
  ];

  return (
    <Card className="transactions-card">
      <Box className="transactions-header">
        <Typography variant="h6">Movimientos Recientes</Typography>
      </Box>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell align="right">Monto</TableCell>
              <TableCell align="center">Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell align="right" className={transaction.amount.startsWith('+') ? 'amount-positive' : 'amount-negative'}>
                  {transaction.amount}
                </TableCell>
                <TableCell align="center">
                  <Chip 
                    label={transaction.status} 
                    className={`status-chip ${transaction.status}`}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default TransactionHistory; 