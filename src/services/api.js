// src/services/api.js

import axios from 'axios';

// URL base para las peticiones al backend
const API_URL = 'http://localhost:5000/api'; // Verifica que este puerto coincida con tu backend

// Función para hacer login
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
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
    throw error.response?.data?.message || 'Error al verificar el código';
  }
};

// Función para registrar un nuevo usuario
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      email: userData.email,
      password: userData.password,
      nombre: userData.nombres, // Cambiado a 'nombre'
      apellido: userData.apellidos, // Cambiado a 'apellido'
      tipoDocumento: userData.tipoDocumento,
      numeroCedula: userData.numeroCedula,
      ciudad: userData.estado, // Cambiado a 'ciudad'
      codigoPais: userData.pais, // Cambiado a 'codigoPais'
      numeroTelefonico: userData.numeroTelefonico
    });
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error en el registro');
  }
};