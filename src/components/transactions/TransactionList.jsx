import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import '../../css/transactions/TransactionList.css';

const TransactionList = ({ tabValue, searchQuery }) => {
  const transactions = [
    {
      id: 1,
      description: 'Depósito de Ahorro',
      date: '15 Mar 2024',
      amount: '+$1,200.00',
      status: 'completed',
      type: 'deposit'
    },
    // ... más transacciones
  ];

  const filteredTransactions = transactions.filter(transaction => {
    if (searchQuery) {
      return transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
    }
    if (tabValue === 1) return transaction.amount.startsWith('+');
    if (tabValue === 2) return transaction.amount.startsWith('-');
    return true;
  });

  return (
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
          {filteredTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell 
                align="right"
                className={transaction.amount.startsWith('+') ? 'amount-positive' : 'amount-negative'}
              >
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
  );
};

export default TransactionList; 