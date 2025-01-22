import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import '../../css/products/ProductCard.css';

const ProductCard = ({ title, description, minAmount, maxAmount, term, rate }) => {
  return (
    <Card className="product-card">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {description}
        </Typography>
        <Box className="product-details">
          <Typography variant="body2">
            Monto: ${minAmount.toLocaleString()} - ${maxAmount.toLocaleString()}
          </Typography>
          <Typography variant="body2">
            Plazo: {term}
          </Typography>
          <Typography variant="body2">
            Tasa: {rate}
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          className="apply-button"
        >
          Solicitar
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard; 