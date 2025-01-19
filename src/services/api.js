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
    throw new Error(error.response?.data?.message || 'Error en el inicio de sesión');
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
    throw new Error(error.response?.data?.message || 'Error al verificar el código');
  }
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