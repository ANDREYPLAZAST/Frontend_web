import React from 'react';
import { Card, Box, Typography, IconButton } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import '../../css/dashboard/MainCard.css';

const MainCard = () => {
  return (
    <Card className="main-wallet-card">
      <Box className="wallet-header">
        <Typography variant="subtitle1">Main wallet</Typography>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Box>

      <Box className="wallet-balance">
        <Typography variant="h3">$ 9,050.00</Typography>
        <Typography variant="subtitle2" className="income-text">
          Income: $4,560
        </Typography>
      </Box>

      <Box className="wallet-categories">
        <Box className="category-item">
          <Box className="category-icon electronic">💡</Box>
          <Box className="category-details">
            <Typography variant="subtitle2">Electronic</Typography>
            <Typography variant="body1">$ 899.00</Typography>
          </Box>
        </Box>

        <Box className="category-item">
          <Box className="category-icon cosmetic">💄</Box>
          <Box className="category-details">
            <Typography variant="subtitle2">Cosmetic</Typography>
            <Typography variant="body1">$ 123.00</Typography>
          </Box>
        </Box>

        <Box className="category-item">
          <Box className="category-icon pets">🐾</Box>
          <Box className="category-details">
            <Typography variant="subtitle2">Pets Shop</Typography>
            <Typography variant="body1">$ 350.12</Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default MainCard; 