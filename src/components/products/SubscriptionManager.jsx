import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Box, 
  Typography, 
  Button, 
  Grid,
  TextField,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const SubscriptionManager = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [newSubscription, setNewSubscription] = useState({
    nombre: '',
    costo: '',
    frecuencia: 'mensual',
    fechaInicio: '',
    categoria: 'entretenimiento'
  });

  // Categorías predefinidas con sus servicios comunes
  const subscriptionTypes = {
    entretenimiento: ['Netflix', 'Amazon Prime', 'Disney+', 'HBO Max', 'Spotify'],
    software: ['Microsoft 365', 'Adobe Creative Cloud', 'Dropbox'],
    gaming: ['Xbox Game Pass', 'PlayStation Plus', 'Nintendo Online'],
    otros: ['Otros']
  };

  const handleAddSubscription = async () => {
    try {
      const response = await fetch('/api/suscripciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSubscription),
      });
      const data = await response.json();
      setSubscriptions([...subscriptions, data]);
      // Limpiar el formulario
      setNewSubscription({
        nombre: '',
        costo: '',
        frecuencia: 'mensual',
        fechaInicio: '',
        categoria: 'entretenimiento'
      });
    } catch (error) {
      console.error('Error al agregar suscripción:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Gestión de Suscripciones
      </Typography>

      {/* Formulario de nueva suscripción */}
      <Card sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Select
              fullWidth
              value={newSubscription.categoria}
              onChange={(e) => setNewSubscription({
                ...newSubscription,
                categoria: e.target.value
              })}
            >
              {Object.keys(subscriptionTypes).map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              fullWidth
              value={newSubscription.nombre}
              onChange={(e) => setNewSubscription({
                ...newSubscription,
                nombre: e.target.value
              })}
            >
              {subscriptionTypes[newSubscription.categoria].map((service) => (
                <MenuItem key={service} value={service}>
                  {service}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Costo"
              value={newSubscription.costo}
              onChange={(e) => setNewSubscription({
                ...newSubscription,
                costo: e.target.value
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              fullWidth
              value={newSubscription.frecuencia}
              onChange={(e) => setNewSubscription({
                ...newSubscription,
                frecuencia: e.target.value
              })}
            >
              <MenuItem value="mensual">Mensual</MenuItem>
              <MenuItem value="anual">Anual</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddSubscription}
            >
              Agregar Suscripción
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Lista de suscripciones */}
      <Grid container spacing={2}>
        {subscriptions.map((subscription, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">{subscription.nombre}</Typography>
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
              <Typography color="textSecondary">
                ${subscription.costo} / {subscription.frecuencia}
              </Typography>
              <Typography variant="body2">
                Categoría: {subscription.categoria}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SubscriptionManager; 