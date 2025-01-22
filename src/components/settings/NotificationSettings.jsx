import React from 'react';
import { Card, Box, Typography, FormGroup, FormControlLabel, Switch } from '@mui/material';
import '../../css/settings/NotificationSettings.css';

const NotificationSettings = () => {
  return (
    <Card className="settings-card">
      <Typography variant="h6" className="settings-title">
        Notificaciones
      </Typography>

      <Box className="notifications-form">
        <Box className="notification-section">
          <Typography variant="subtitle2" className="section-subtitle">
            Notificaciones por Correo
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Resumen de transacciones"
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Alertas de seguridad"
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Actualizaciones de cuenta"
            />
          </FormGroup>
        </Box>

        <Box className="notification-section">
          <Typography variant="subtitle2" className="section-subtitle">
            Notificaciones Push
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Transacciones importantes"
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Recordatorios de pago"
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Nuevas ofertas y promociones"
            />
          </FormGroup>
        </Box>
      </Box>
    </Card>
  );
};

export default NotificationSettings; 