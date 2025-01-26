// src/services/api.js

import axios from 'axios';

// Mantener la URL base aquí
const API_URL = 'http://localhost:5000/api';

// Login con 2FA
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error en el inicio de sesión');
  }
};

// Verificar OTP
export const verifyOTP = async (email, otp) => {
  try {
    const response = await axios.post(`${API_URL}/auth/verify-otp`, {
      email,
      otp
    });
    
    if (response.data.token) {
      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al verificar el código');
  }
};

// Actualizar perfil
export const updateUserProfile = async (profileData) => {
  try {
    const token = localStorage.getItem('userToken');
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const response = await axios({
      method: 'PUT',
      url: `${API_URL}/users/profile`,
      data: profileData,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error actualizando perfil:', error);
    throw new Error(error.response?.data?.message || 'Error actualizando perfil');
  }
};

// Cambiar contraseña
export const updatePassword = async (passwordData) => {
  try {
    const token = localStorage.getItem('userToken');
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const response = await axios({
      method: 'PUT',
      url: `${API_URL}/users/change-password`,
      data: {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      },
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al cambiar la contraseña');
  }
};

// Verificar autenticación
export const isAuthenticated = () => {
  return !!localStorage.getItem('userToken');
};

// Cerrar sesión
export const logout = () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('userData');
};

// Función para registrar un nuevo usuario
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      email: userData.email,
      password: userData.password,
      nombre: userData.nombres,
      apellido: userData.apellidos,
      tipoDocumento: userData.tipoDocumento,
      numeroCedula: userData.numeroCedula,
      ciudad: userData.estado,
      codigoPais: userData.pais,
      numeroTelefonico: userData.numeroTelefonico
    });
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error en el registro');
  }
};

// Función para solicitar restablecimiento de contraseña
export const forgotPassword = async (emailOrDoc) => {
  try {
    const response = await axios.post(`${API_URL}/auth/forgot-password`, {
      emailOrDoc
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al solicitar restablecimiento de contraseña');
  }
};

// Función para verificar el código
export const verifyCode = async (code, email) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/verify-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, email }), // Asegúrate de que el cuerpo sea correcto
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al verificar el código');
    }

    const data = await response.json();
    console.log(data);
    // Manejar la respuesta aquí
  } catch (error) {
    console.error('Error:', error);
  }
};

// Función para restablecer la contraseña
export const resetPassword = async (newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/auth/reset-password`, {
      newPassword
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al restablecer la contraseña');
  }
};

// Función helper para obtener headers con autorización
const getAuthHeaders = () => {
  const token = localStorage.getItem('userToken');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

// Función helper para manejar errores de API
const handleApiError = (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        throw new Error('Datos inválidos');
      case 401:
        throw new Error('No autorizado');
      case 403:
        throw new Error('Token inválido o expirado');
      case 404:
        throw new Error('Recurso no encontrado');
      case 500:
        throw new Error('Error del servidor');
      default:
        throw new Error(error.response.data.message || 'Error en la operación');
    }
  }
  throw new Error('Error de conexión');
};

// Usar estas funciones helper en todas las llamadas autenticadas
export const someAuthenticatedCall = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/some-endpoint`, data, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Función para subir imagen de perfil
export const uploadProfileImage = async (formData) => {
  try {
    const token = localStorage.getItem('userToken');
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const response = await axios({
      method: 'POST',
      url: `${API_URL}/users/profile-image`,
      data: formData,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    // Actualizar el userData en localStorage con la nueva imagen
    const userData = JSON.parse(localStorage.getItem('userData'));
    userData.profileImage = response.data.imageUrl;
    localStorage.setItem('userData', JSON.stringify(userData));

    return response.data;
  } catch (error) {
    console.error('Error al subir imagen:', error);
    throw new Error(error.response?.data?.message || 'Error al subir la imagen');
  }
};