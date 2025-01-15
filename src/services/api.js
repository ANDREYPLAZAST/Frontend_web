// src/services/api.js

import axios from 'axios';

// URL base para las peticiones al backend
const API_URL = 'http://localhost:5000/api'; // Ajusta esto según la URL de tu backend

// Función para hacer login
export const loginUser = async (email, password) => {
  try {
    console.log('Intentando login con:', { email, password }); // Para debug
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });
    
    console.log('Respuesta del servidor:', response.data); // Para debug
    
    if (response.data.token) {
      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    console.error('Error completo:', error); // Para debug
    throw error.response?.data?.message || 'Error en el inicio de sesión';
  }
};

export const logout = () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('userData');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('userToken');
};

// Función para verificar el OTP
export const verifyOTP = async (email, otp) => {
  try {
    const response = await axios.post(`${API_URL}/verify-otp`, { email, otp });
    return response.data; // Deberías recibir un objeto con el token
  } catch (error) {
    console.error('Error al verificar OTP', error);
    throw error;
  }
};
