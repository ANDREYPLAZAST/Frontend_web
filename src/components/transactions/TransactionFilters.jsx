import React from 'react';
import { Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import '../../css/transactions/TransactionFilters.css';

const TransactionFilters = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className="filters-container">
        <FormControl className="filter-item" size="small">
          <InputLabel>Tipo</InputLabel>
          <Select
            defaultValue="all"
            label="Tipo"
          >
            <MenuItem value="all">Todos</MenuItem>
            <MenuItem value="deposit">Depósitos</MenuItem>
            <MenuItem value="withdrawal">Retiros</MenuItem>
            <MenuItem value="transfer">Transferencias</MenuItem>
          </Select>
        </FormControl>

        <DatePicker
          label="Desde"
          className="filter-item"
          slotProps={{ 
            textField: { 
              size: 'small',
              fullWidth: true 
            } 
          }}
        />

        <DatePicker
          label="Hasta"
          className="filter-item"
          slotProps={{ 
            textField: { 
              size: 'small',
              fullWidth: true 
            } 
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default TransactionFilters; 