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
    
    console.log('Respuesta del servidor:', response.data); // Para debug
    
    // Si la respuesta indica que se requiere 2FA
    if (response.data.requires2FA) {
      return {
        requires2FA: true,
        email,
        message: 'Se requiere verificación de dos factores'
      };
    }
    
    return response.data;
  } catch (error) {
    console.error('Error completo:', error);
    throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
  }
};

// Verificar OTP
export const verifyOTP = async (email, otp) => {
  try {
    const response = await axios.post(`${API_URL}/auth/verify-otp`, {
      email,
      otp
    });
    
    console.log('Respuesta verificación OTP:', response.data); // Para debug
    return response.data;
  } catch (error) {
    console.error('Error en verificación OTP:', error);
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

    // Obtenemos el ID del usuario directamente de profileData
    const userId = profileData.id;
    if (!userId) {
      throw new Error('ID de usuario no encontrado');
    }

    // Eliminamos el id de los datos a enviar ya que va en la URL
    const { id, ...dataToSend } = profileData;

    const response = await axios.put(
      `${API_URL}/users/profile/${userId}`,
      dataToSend,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data;
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error('No tienes permiso para actualizar este perfil');
    }
    console.error('Error completo:', error);
    throw new Error(error.response?.data?.message || 'Error al actualizar el perfil');
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
export const isAuthenticated = async () => {
  const token = localStorage.getItem('userToken');
  if (!token) return false;

  try {
    // Verificar el token y obtener los datos completos del usuario
    const response = await axios.get(`${API_URL}/users/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Actualizar los datos del usuario en localStorage
    localStorage.setItem('userData', JSON.stringify(response.data.user));
    return true;
  } catch (error) {
    console.error('Error al verificar autenticación:', error);
    return false;
  }
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

// Función para obtener todas las transacciones
export const getTransactions = async () => {
  try {
    const token = localStorage.getItem('userToken');
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const response = await axios.get(`${API_URL}/transactions`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    console.error('Error completo:', error);
    throw new Error(error.response?.data?.message || 'Error al obtener las transacciones');
  }
};

// Función para crear una nueva transacción
export const createTransaction = async (transactionData) => {
  try {
    const token = localStorage.getItem('userToken');
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const response = await axios.post(`${API_URL}/transactions`, 
      {
        ...transactionData,
        fecha: transactionData.fecha.toISOString(), // Formatear la fecha
        estado: 'completada'
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error completo:', error);
    throw new Error(error.response?.data?.message || 'Error al crear la transacción');
  }
};