import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Chip,
  Button,
  Box
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { getTransactions } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import CreateTransaction from './CreateTransaction';
import '../../css/transactions/TransactionList.css';

const TransactionList = ({ tabValue, searchQuery, dateRange }) => {
  const [transactions, setTransactions] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, updateUserData } = useAuth();

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const response = await getTransactions();
      setTransactions(response.data);
      
      // Actualizar el balance del usuario cuando obtenemos las transacciones
      if (response.balanceActual !== undefined) {
        updateUserData({
          ...user,
          user: {
            ...user.user,
            balance: response.balanceActual
          }
        });
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Error al cargar las transacciones');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleTransactionCreated = async () => {
    await loadTransactions(); // Recargar transacciones y balance
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (searchQuery) {
      return transaction.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
    }
    if (tabValue === 1) return transaction.tipo === 'ingreso';
    if (tabValue === 2) return transaction.tipo === 'egreso';
    if (dateRange?.startDate && dateRange?.endDate) {
      const transactionDate = new Date(transaction.fecha);
      return transactionDate >= dateRange.startDate && 
             transactionDate <= dateRange.endDate;
    }
    return true;
  });

  return (
    <>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenCreate(true)}
        >
          Nueva Transacción
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell align="right">Monto</TableCell>
              <TableCell align="center">Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction._id || transaction.id}>
                <TableCell>{transaction.descripcion}</TableCell>
                <TableCell>{transaction.categoria}</TableCell>
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

      <CreateTransaction
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onTransactionCreated={handleTransactionCreated}
      />
    </>
  );
};

export default TransactionList; 