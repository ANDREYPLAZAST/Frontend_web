import React, { useContext, useState, useEffect } from 'react';
import { loginUser, verifyOTP, isAuthenticated } from '../services/api';
import AuthContext from './AuthContextBase';

// Hook personalizado para usar el contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}

// Componente Provider
const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requires2FA, setRequires2FA] = useState(false);

  const checkAuth = async () => {
    try {
      const isUserAuth = isAuthenticated();
      if (isUserAuth) {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
          setUser({ user: userData });
          setIsAuth(true);
        }
      }
    } catch (error) {
      console.error('Error validando autenticación:', error);
      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginUser(email, password);
      if (response.status === 'success') {
        localStorage.setItem('userToken', response.token);
        localStorage.setItem('userData', JSON.stringify(response.user));
        setUser(response);
        setIsAuth(true);
      }
      return response;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  const verify2FA = async (email, otp) => {
    try {
      const response = await verifyOTP(email, otp);
      console.log('Respuesta verify2FA:', response);
      
      if (response.token) {
        localStorage.setItem('userToken', response.token);
        // Guardamos todos los datos del usuario incluyendo el ID
        const userData = {
          id: response.user.id,
          email: response.user.email,
          nombre: response.user.nombre,
          apellido: response.user.apellido,
          tipoDocumento: response.user.tipoDocumento,
          numeroCedula: response.user.numeroCedula,
          ciudad: response.user.ciudad,
          codigoPais: response.user.codigoPais,
          numeroTelefonico: response.user.numeroTelefonico,
          profileImage: response.user.profileImage
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        setUser({ user: userData });
        setIsAuth(true);
        setRequires2FA(false);
      }
      return response;
    } catch (error) {
      console.error('Error en verify2FA:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    setUser(null);
    setIsAuth(false);
  };

  const updateUserData = (newData) => {
    setUser(newData);
    localStorage.setItem('userData', JSON.stringify(newData.user));
  };

  const value = {
    isAuthenticated: isAuth,
    user,
    loading,
    requires2FA,
    login,
    verify2FA,
    logout,
    updateUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider }; 