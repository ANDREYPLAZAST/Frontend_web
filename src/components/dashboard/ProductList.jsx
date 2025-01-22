import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import '../../css/dashboard/ProductList.css';

const ProductList = () => {
  const products = [
    {
      id: 1,
      name: 'Amazon',
      symbol: 'AMZN',
      price: '$3,560.48',
      change: '+$120.00',
      letter: 'A'
    },
    {
      id: 2,
      name: 'Alphabet',
      symbol: 'GOOGL',
      price: '$2,865.86',
      change: '+$85.40',
      letter: 'G'
    },
    {
      id: 3,
      name: 'eBay',
      symbol: 'EBAY',
      price: '$59.29',
      change: '+$2.15',
      letter: 'E'
    },
    {
      id: 4,
      name: 'Meta',
      symbol: 'META',
      price: '$237.09',
      change: '+$5.20',
      letter: 'M'
    },
    {
      id: 5,
      name: 'Microsoft',
      symbol: 'MSFT',
      price: '$305.94',
      change: '+$7.80',
      letter: 'M'
    }
  ];

  return (
    <Box className="product-section">
      <Box className="product-header">
        <Typography variant="h6">Product</Typography>
        <Typography variant="body2" className="see-all">
          See All
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card className="product-card">
              <CardContent>
                <Box className="product-icon">
                  {product.letter}
                </Box>
                <Box className="product-info">
                  <Typography variant="subtitle1">{product.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.symbol}
                  </Typography>
                </Box>
                <Box className="product-price">
                  <Typography variant="h6">{product.price}</Typography>
                  <Typography variant="body2" className="price-change">
                    {product.change}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList; 