import React, { useState } from 'react';
import { 
  Card, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  CircularProgress,
  Alert
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { getFondoData } from '../../services/financeApi';
import '../../css/dashboard/FinancialData.css';

const FinancialData = () => {
  const [ticker, setTicker] = useState('');
  const [fondoData, setFondoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!ticker) return;
    
    setLoading(true);
    setError('');
    
    try {
      const data = await getFondoData(ticker);
      if (!data || !data.nombre) {
        throw new Error('Formato de datos inválido');
      }
      setFondoData(data);
    } catch (err) {
      setError(err.message);
      setFondoData(null);
      console.error('Error detallado:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="financial-data-card">
      <Box className="search-section">
        <TextField
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          placeholder="Ingrese ticker (ej: BLK)"
          variant="outlined"
          size="small"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
          disabled={loading || !ticker}
        >
          Buscar
        </Button>
      </Box>

      {error && (
        <Alert severity="error" className="error-alert">
          {error}
        </Alert>
      )}

      {fondoData && (
        <Box className="data-display">
          <Typography variant="h5" gutterBottom>
            {fondoData.nombre}
          </Typography>

          <Box className="price-section">
            <Typography variant="h4">
              ${fondoData.precio.toFixed(2)}
            </Typography>
            <Typography 
              variant="h6"
              className={fondoData.variacion >= 0 ? 'positive' : 'negative'}
            >
              {fondoData.variacion >= 0 ? '+' : ''}{fondoData.variacion}%
            </Typography>
          </Box>

          <Box className="details-grid">
            <Box className="detail-item">
              <Typography variant="body2">Apertura</Typography>
              <Typography variant="h6">${fondoData.apertura.toFixed(2)}</Typography>
            </Box>
            <Box className="detail-item">
              <Typography variant="body2">Máximo</Typography>
              <Typography variant="h6">${fondoData.maximo.toFixed(2)}</Typography>
            </Box>
            <Box className="detail-item">
              <Typography variant="body2">Mínimo</Typography>
              <Typography variant="h6">${fondoData.minimo.toFixed(2)}</Typography>
            </Box>
            <Box className="detail-item">
              <Typography variant="body2">Volumen</Typography>
              <Typography variant="h6">{fondoData.volumen.toLocaleString()}</Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default FinancialData; 