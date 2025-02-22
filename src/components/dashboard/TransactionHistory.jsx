import React, { useState, useEffect } from 'react';
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
import { getTransactions } from '../../services/api';
import '../../css/dashboard/TransactionHistory.css';

const TransactionHistory = () => {
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    const loadRecentTransactions = async () => {
      try {
        const response = await getTransactions();
        // Tomar solo las últimas 3 transacciones
        const lastThree = response.data.slice(0, 3);
        setRecentTransactions(lastThree);
      } catch (error) {
        console.error('Error cargando transacciones recientes:', error);
      }
    };

    loadRecentTransactions();
  }, []);

  return (
    <Card className="transaction-history-card">
      <Typography variant="h6" className="section-title">
        Movimientos Recientes
      </Typography>
      
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
            {recentTransactions.map((transaction) => (
              <TableRow key={transaction._id || transaction.id}>
                <TableCell>{transaction.descripcion}</TableCell>
                <TableCell>
                  {new Date(transaction.fecha).toLocaleDateString()}
                </TableCell>
                <TableCell 
                  align="right"
                  className={transaction.tipo === 'ingreso' ? 'amount-positive' : 'amount-negative'}
                >
                  {transaction.tipo === 'ingreso' ? '+' : '-'}
                  ${Math.abs(transaction.monto).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <Chip 
                    label={transaction.estado}
                    className={`status-chip ${transaction.estado}`}
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