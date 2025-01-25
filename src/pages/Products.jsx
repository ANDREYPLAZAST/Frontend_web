import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Tab, Tabs, Button } from '@mui/material';
import Sidebar from '../components/dashboard/Sidebar';
import ProductCard from '../components/products/ProductCard';
import ProductSimulator from '../components/products/ProductSimulator';
import '../css/pages/Products.css';

const Products = () => {
  const [tabValue, setTabValue] = useState(0);

  const products = [
    {
      title: 'Crédito Personal',
      description: 'Préstamos personalizados con tasas competitivas',
      minAmount: 1000,
      maxAmount: 50000,
      term: '12-60 meses',
      rate: '12.5%'
    },
    {
      title: 'Crédito Empresarial',
      description: 'Financiamiento para hacer crecer tu negocio',
      minAmount: 5000,
      maxAmount: 200000,
      term: '24-84 meses',
      rate: '10.8%'
    },
    {
      title: 'Crédito Educativo',
      description: 'Invierte en tu futuro con tasas preferenciales',
      minAmount: 3000,
      maxAmount: 100000,
      term: '36-120 meses',
      rate: '8.9%'
    }
  ];

  const handleSolicitar = () => {
    // Implement the logic to handle soliciting a product
  };

  return (
    <Box className="dashboard-layout">
      <Sidebar />
      <Box className="main-content">
        <Container>
          <Typography variant="h5" className="page-title">
            Productos Financieros
          </Typography>

          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            className="products-tabs"
          >
            <Tab label="Créditos" />
            <Tab label="Ahorros" />
            <Tab label="Inversiones" />
          </Tabs>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                {products.map((product, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <ProductCard {...product} />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12} md={4}>
              <ProductSimulator />
              <Button 
                variant="contained" 
                fullWidth 
                onClick={handleSolicitar}
                sx={{
                  backgroundColor: '#4CAF50',
                  '&:hover': {
                    backgroundColor: '#45a049',
                  }
                }}
              >
                Solicitar
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Products; 