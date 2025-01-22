import React from 'react';
import { Box, Card, Typography, Chip } from '@mui/material';
import '../../css/dashboard/SmartInvest.css';

const SmartInvest = () => {
  const investments = [
    {
      name: 'Tesla',
      symbol: 'TSLA',
      price: '$797.44',
      change: '+34.42',
      changePercent: '4.49%'
    },
    {
      name: 'Apple',
      symbol: 'AAPL',
      price: '$183.63',
      change: '+3.01',
      changePercent: '2.00%'
    },
    {
      name: 'Meta',
      symbol: 'FB',
      price: '$189.90',
      change: '+3.28',
      changePercent: '1.76%'
    }
  ];

  return (
    <Card className="smart-invest-card">
      <Box className="smart-invest-header">
        <Typography variant="h6">Smart Invest</Typography>
        <Typography variant="body2" color="primary" className="show-more">
          Show more
        </Typography>
      </Box>

      <Box className="investment-filters">
        <Chip label="Popular" className="filter-chip active" />
        <Chip label="Tech" className="filter-chip" />
        <Chip label="Social Media" className="filter-chip" />
        <Chip label="Gaming" className="filter-chip" />
      </Box>

      <Box className="investments-list">
        {investments.map((investment) => (
          <Box key={investment.symbol} className="investment-item">
            <Box className="investment-info">
              <Typography variant="subtitle1">{investment.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {investment.symbol}
              </Typography>
            </Box>
            <Box className="investment-price">
              <Typography variant="subtitle1">{investment.price}</Typography>
              <Typography variant="body2" className="price-change positive">
                {investment.change} ({investment.changePercent})
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default SmartInvest; 