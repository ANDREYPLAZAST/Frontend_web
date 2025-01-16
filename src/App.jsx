// src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Importar Routes y Route
import LoginPage from './pages/Login'; // Página de Login
import Register from './pages/Register';
import DashboardPage from './pages/Dashboard'; // Página de Dashboard
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
