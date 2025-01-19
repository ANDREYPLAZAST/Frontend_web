// src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Importar Routes y Route
import LoginPage from './pages/Login'; // Página de Login
import Register from './pages/Register'; // Página de Registro
import ForgotPassword from './pages/ForgotPassword'; // Nueva ruta
import VerifyCode from './pages/VerifyCode'; // Nueva ruta
import ResetPassword from './pages/ResetPassword'; // Nueva ruta
import DashboardPage from './pages/Dashboard'; // Página de Dashboard
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Página de inicio de sesión */}
        <Route path="/register" element={<Register />} /> {/* Página de registro */}
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Nueva ruta */}
        <Route path="/verify-code" element={<VerifyCode />} /> {/* Nueva ruta */}
        <Route path="/reset-password" element={<ResetPassword />} /> {/* Nueva ruta */}
        <Route path="/dashboard" element={<DashboardPage />} /> {/* Página de dashboard */}
      </Routes>
    </AuthProvider>
  );
};

export default App;
