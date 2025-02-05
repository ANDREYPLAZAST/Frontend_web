import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { createTransaction } from '../../services/api';

const CreateTransaction = ({ open, onClose, onTransactionCreated }) => {
  const [transaction, setTransaction] = useState({
    tipo: '',
    categoria: '',
    monto: '',
    descripcion: '',
    fecha: null,
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!transaction.tipo || !transaction.monto || !transaction.fecha) {
      setError('Por favor complete todos los campos requeridos');
      return;
    }

    if (transaction.monto <= 0) {
      setError('El monto debe ser mayor a 0');
      return;
    }

    try {
      const response = await createTransaction({
        ...transaction,
        monto: Number(transaction.monto),
        estado: 'completada'
      });
      
      onTransactionCreated(response);
      onClose();
    } catch (err) {
      setError(err.message || 'Error al crear la transacción');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Nueva Transacción</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Tipo</InputLabel>
            <Select
              value={transaction.tipo}
              onChange={(e) => setTransaction({...transaction, tipo: e.target.value})}
              required
            >
              <MenuItem value="ingreso">Ingreso</MenuItem>
              <MenuItem value="egreso">Egreso</MenuItem>
              <MenuItem value="transferencia">Transferencia</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Categoría</InputLabel>
            <Select
              value={transaction.categoria}
              onChange={(e) => setTransaction({...transaction, categoria: e.target.value})}
              required
            >
              <MenuItem value="salario">Salario</MenuItem>
              <MenuItem value="comida">Comida</MenuItem>
              <MenuItem value="transporte">Transporte</MenuItem>
              <MenuItem value="servicios">Servicios</MenuItem>
              <MenuItem value="otros">Otros</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            label="Monto"
            type="number"
            value={transaction.monto}
            onChange={(e) => setTransaction({...transaction, monto: e.target.value})}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Descripción"
            value={transaction.descripcion}
            onChange={(e) => setTransaction({...transaction, descripcion: e.target.value})}
            multiline
            rows={2}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha"
              value={transaction.fecha}
              onChange={(newValue) => setTransaction({...transaction, fecha: newValue})}
              slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
            />
          </LocalizationProvider>

          {error && (
            <Box sx={{ color: 'error.main', mt: 2 }}>
              {error}
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Crear Transacción
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTransaction; 