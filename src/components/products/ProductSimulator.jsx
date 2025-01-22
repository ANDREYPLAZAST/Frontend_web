import React, { useState } from 'react';
import { 
  Card, 
  Box, 
  Typography, 
  TextField, 
  Slider, 
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import '../../css/products/ProductSimulator.css';

const ProductSimulator = () => {
  const [amount, setAmount] = useState(5000);
  const [term, setTerm] = useState(12);
  const [productType, setProductType] = useState('personal');

  const calculatePayment = () => {
    // Aquí iría la lógica de cálculo
    const interestRate = 0.15; // 15% anual
    const monthlyRate = interestRate / 12;
    const payment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
    return payment.toFixed(2);
  };

  return (
    <Card className="simulator-card">
      <Typography variant="h6" gutterBottom>
        Simulador de Crédito
      </Typography>

      <Box className="simulator-form">
        <FormControl fullWidth margin="normal">
          <InputLabel>Tipo de Crédito</InputLabel>
          <Select
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            label="Tipo de Crédito"
          >
            <MenuItem value="personal">Crédito Personal</MenuItem>
            <MenuItem value="business">Crédito Empresarial</MenuItem>
            <MenuItem value="education">Crédito Educativo</MenuItem>
          </Select>
        </FormControl>

        <Box className="amount-field">
          <Typography gutterBottom>Monto del Crédito</Typography>
          <TextField
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            type="number"
            fullWidth
            InputProps={{
              startAdornment: <Typography>$</Typography>
            }}
          />
          <Slider
            value={amount}
            onChange={(e, newValue) => setAmount(newValue)}
            min={1000}
            max={50000}
            step={1000}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `$${value}`}
          />
        </Box>

        <Box className="term-field">
          <Typography gutterBottom>Plazo (meses)</Typography>
          <Slider
            value={term}
            onChange={(e, newValue) => setTerm(newValue)}
            min={6}
            max={60}
            step={6}
            marks
            valueLabelDisplay="auto"
          />
        </Box>

        <Box className="simulation-result">
          <Typography variant="subtitle2" color="textSecondary">
            Cuota Mensual Estimada
          </Typography>
          <Typography variant="h4" color="primary">
            ${calculatePayment()}
          </Typography>
        </Box>

        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          size="large"
          className="apply-button"
        >
          Solicitar Crédito
        </Button>
      </Box>
    </Card>
  );
};

export default ProductSimulator; 