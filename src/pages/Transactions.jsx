import React, { useState } from 'react';
import { Box, Container, Typography, TextField, InputAdornment, Card, Tabs, Tab } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import Sidebar from '../components/dashboard/Sidebar';
import TransactionList from '../components/transactions/TransactionList';
import TransactionFilters from '../components/transactions/TransactionFilters';
import '../css/pages/Transactions.css';

const Transactions = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Box className="dashboard-layout">
      <Sidebar />
      <Box className="main-content">
        <Container>
          <Box className="transactions-header">
            <Typography variant="h5">Transacciones</Typography>
            <TextField
              placeholder="Buscar transacciones..."
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              className="search-field"
            />
          </Box>

          <Card className="transactions-card">
            <Box className="transactions-tabs">
              <Tabs 
                value={tabValue} 
                onChange={(e, newValue) => setTabValue(newValue)}
              >
                <Tab label="Todas" />
                <Tab label="Ingresos" />
                <Tab label="Gastos" />
                <Tab label="Transferencias" />
              </Tabs>
            </Box>

            <TransactionFilters />
            <TransactionList tabValue={tabValue} searchQuery={searchQuery} />
          </Card>
        </Container>
      </Box>
    </Box>
  );
};

export default Transactions; 