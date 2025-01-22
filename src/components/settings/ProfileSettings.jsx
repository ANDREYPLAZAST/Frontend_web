import React from 'react';
import { Card, Box, Typography, TextField, Button, Avatar } from '@mui/material';
import { PhotoCamera as PhotoCameraIcon } from '@mui/icons-material';
import '../../css/settings/ProfileSettings.css';

const ProfileSettings = () => {
  return (
    <Card className="settings-card">
      <Typography variant="h6" className="settings-title">
        Perfil Personal
      </Typography>
      
      <Box className="profile-form">
        <Box className="avatar-section">
          <Avatar 
            className="profile-avatar"
            src="/path-to-profile-image.jpg"
          />
          <Button
            variant="outlined"
            startIcon={<PhotoCameraIcon />}
            className="upload-button"
          >
            Cambiar Foto
          </Button>
        </Box>

        <Box className="form-fields">
          <TextField
            label="Nombre Completo"
            defaultValue="Jenifer Smith"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Correo Electrónico"
            defaultValue="jenifer.smith@gmail.com"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Teléfono"
            defaultValue="+1234567890"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Dirección"
            defaultValue="123 Street Name, City"
            fullWidth
            margin="normal"
            multiline
            rows={2}
          />
          
          <Button 
            variant="contained" 
            color="primary"
            className="save-button"
          >
            Guardar Cambios
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default ProfileSettings; 