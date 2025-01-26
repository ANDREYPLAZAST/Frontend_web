import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, verifyOTP, isAuthenticated } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const isUserAuth = isAuthenticated();
      if (isUserAuth) {
        const userData = JSON.parse(localStorage.getItem('userData'));
        console.log('Datos recuperados:', userData); // Para debug
        setUser(userData);
        setIsAuth(true);
      }
    } catch (error) {
      console.error('Error validando autenticación:', error);
      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');
    } finally {
      setLoading(false);
    }
  };

  const login = async (data) => {
    try {
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));
      setUser(data.user);
      setIsAuth(true);
      return true;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
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
    localStorage.setItem('userData', JSON.stringify(newData));
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated: isAuth, 
      user, 
      loading,
      login,
      logout,
      updateUserData
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}; 