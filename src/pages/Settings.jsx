import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Button, 
  TextField,
  Snackbar,
  Alert,
  Avatar 
} from '@mui/material';
import { PhotoCamera as PhotoCameraIcon } from '@mui/icons-material';
import { updateUserProfile, updatePassword, uploadProfileImage } from '../services/api';
import '../css/pages/Settings.css';
import Sidebar from '../components/dashboard/Sidebar';

const Settings = () => {
  const { user, updateUserData } = useAuth();
  const [profileData, setProfileData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    tipoDocumento: '',
    numeroCedula: '',
    ciudad: '',
    codigoPais: '',
    numeroTelefonico: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    console.log('Usuario completo:', user);
    if (user?.user) {
      setProfileData({
        nombre: user.user.nombre || '',
        apellido: user.user.apellido || '',
        email: user.user.email || '',
        tipoDocumento: user.user.tipoDocumento || '',
        numeroCedula: user.user.numeroCedula || '',
        ciudad: user.user.ciudad || '',
        codigoPais: user.user.codigoPais || '',
        numeroTelefonico: user.user.numeroTelefonico || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      handleImageUpload(file);
    }
  };

  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('profileImage', file);
      const response = await uploadProfileImage(formData);
      
      // Actualizar el contexto con la nueva imagen
      updateUserData({
        ...user,
        user: {
          ...user.user,
          profileImage: response.imageUrl
        }
      });

      // Forzar la actualización del avatar
      const avatarElement = document.querySelector('.profile-avatar');
      if (avatarElement) {
        avatarElement.src = response.imageUrl + '?t=' + new Date().getTime();
      }
      
      setSuccessMessage('Imagen de perfil actualizada exitosamente');
      setOpenSnackbar(true);
    } catch (error) {
      setError('Error al subir la imagen');
      setOpenSnackbar(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (!user?.user?.id) {
        setError('Error: ID de usuario no encontrado');
        setOpenSnackbar(true);
        return;
      }

      const dataToUpdate = {
        ...profileData,
        id: user.user.id
      };

      const response = await updateUserProfile(dataToUpdate);
      if (response.message === 'Perfil actualizado correctamente') {
        setSuccessMessage('Cambios guardados exitosamente');
        
        // Actualizamos el estado global con los datos actualizados
        updateUserData({
          ...user,
          user: response.user // Usamos directamente el usuario actualizado que viene del backend
        });

        // Forzar actualización del sidebar y otros componentes
        window.dispatchEvent(new Event('userUpdated'));
      } else {
        setError('No se pudieron guardar los cambios');
      }
    } catch (error) {
      setError(error.message || 'Error al actualizar el perfil');
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      await updatePassword(passwordData);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setSuccessMessage('Contraseña actualizada correctamente');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box className="dashboard-layout">
      <Sidebar />
      <Box className="main-content">
        <Container>
          <Typography variant="h5" className="page-title">
            Configuración
          </Typography>

          <Grid container spacing={3}>
            {/* Sección de imagen de perfil - MOVIDA AL PRINCIPIO */}
            <Grid item xs={12}>
              <Box className="settings-section profile-image-section">
                <Avatar
                  src={user?.user?.profileImage || '/default-avatar.jpg'}
                  sx={{ width: 120, height: 120 }}
                />
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<PhotoCameraIcon />}
                  className="upload-button"
                >
                  Cambiar Foto
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>
              </Box>
            </Grid>

            {/* Resto del formulario de perfil */}
            <Grid item xs={12}>
              <Box className="settings-section">
                <Typography variant="h6" gutterBottom>
                  Perfil Personal
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Nombre"
                        name="nombre"
                        value={profileData.nombre}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Apellido"
                        name="apellido"
                        value={profileData.apellido}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={profileData.email}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Tipo de Documento"
                        name="tipoDocumento"
                        value={profileData.tipoDocumento}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Número de Cédula"
                        name="numeroCedula"
                        value={profileData.numeroCedula}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="País"
                        name="codigoPais"
                        value={profileData.codigoPais}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Ciudad"
                        name="ciudad"
                        value={profileData.ciudad}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Teléfono"
                        name="numeroTelefonico"
                        value={profileData.numeroTelefonico}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          backgroundColor: '#4CAF50',
                          '&:hover': {
                            backgroundColor: '#45a049'
                          },
                          width: '200px' // Ancho fijo para el botón
                        }}
                      >
                        GUARDAR CAMBIOS
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>

            {/* Cambio de Contraseña */}
            <Grid item xs={12}>
              <Box className="settings-section">
                <Typography variant="h6" gutterBottom>
                  Cambiar Contraseña
                </Typography>
                {error && (
                  <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                  </Typography>
                )}
                {successMessage && (
                  <Typography color="success.main" sx={{ mb: 2 }}>
                    {successMessage}
                  </Typography>
                )}
                <Box component="form" onSubmit={handlePasswordChange}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type="password"
                        label="Contraseña Actual"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({
                          ...passwordData,
                          currentPassword: e.target.value
                        })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type="password"
                        label="Nueva Contraseña"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value
                        })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type="password"
                        label="Confirmar Nueva Contraseña"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value
                        })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                          backgroundColor: '#4CAF50',
                          '&:hover': {
                            backgroundColor: '#45a049'
                          }
                        }}
                      >
                        CAMBIAR CONTRASEÑA
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Snackbar modificado para mostrar el mensaje correcto */}
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity={error ? "error" : "success"}
          sx={{ width: '100%' }}
        >
          {error || successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings; 