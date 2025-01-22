import React from 'react';
import { Box, Card, Typography, Avatar, TextField, Button } from '@mui/material';
import '../../css/dashboard/FastTransfer.css';

const FastTransfer = () => {
  const contacts = [
    { id: 1, name: 'Sarah', avatar: '👩' },
    { id: 2, name: 'Michael', avatar: '👨' },
    { id: 3, name: 'Emma', avatar: '👩' },
    { id: 4, name: 'John', avatar: '👨' }
  ];

  return (
    <Card className="fast-transfer-card">
      <Box className="fast-transfer-header">
        <Typography variant="h6">Fast transfer</Typography>
        <Button variant="outlined" size="small">+ Add people</Button>
      </Box>

      <Box className="contacts-list">
        {contacts.map((contact) => (
          <Avatar key={contact.id} className="contact-avatar">
            {contact.avatar}
          </Avatar>
        ))}
      </Box>

      <Box className="transfer-form">
        <Box className="form-row">
          <Box className="form-group">
            <Typography variant="body2">From</Typography>
            <TextField 
              fullWidth 
              value="Mastercard **** 1535"
              disabled
            />
          </Box>
          <Box className="form-group">
            <Typography variant="body2">To</Typography>
            <TextField 
              fullWidth 
              value="5978 8447 1367 4141"
            />
          </Box>
        </Box>

        <Box className="form-row">
          <Box className="form-group">
            <Typography variant="body2">Amount</Typography>
            <TextField 
              fullWidth 
              value="$3,567"
            />
          </Box>
          <Box className="form-group">
            <Typography variant="body2">CVV</Typography>
            <TextField 
              fullWidth 
              type="password"
              placeholder="***"
            />
          </Box>
        </Box>

        <Button variant="contained" fullWidth className="transfer-button">
          Transfer
        </Button>
      </Box>
    </Card>
  );
};

export default FastTransfer; 