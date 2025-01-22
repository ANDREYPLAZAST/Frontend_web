import React from 'react';
import { Card, Box, Typography, TextField, Button, Switch, FormControlLabel } from '@mui/material';
import '../../css/settings/SecuritySettings.css';

const SecuritySettings = () => {
  return (
    <Card className="settings-card">
      <Typography variant="h6" className="settings-title">
        Seguridad
      </Typography>

      <Box className="security-form">
        <Typography variant="subtitle2" className="section-subtitle">
          Cambiar Contraseña
        </Typography>
        
        <TextField
          label="Contraseña Actual"
          type="password"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Nueva Contraseña"
          type="password"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Confirmar Nueva Contraseña"
          type="password"
          fullWidth
          margin="normal"
        />

        <Box className="security-options">
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Autenticación de dos factores"
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Notificaciones de inicio de sesión"
          />
        </Box>

        <Button 
          variant="contained" 
          color="primary"
          className="save-button"
        >
          Actualizar Seguridad
        </Button>
      </Box>
    </Card>
  );
};

export default SecuritySettings; 