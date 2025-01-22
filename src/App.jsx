// src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import DashboardPage from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import './App.css';

// Páginas del Dashboard
import Transactions from './pages/Transactions';
import Portfolio from './pages/Portfolio';
import Products from './pages/Products';
import Learning from './pages/Learning';
import Support from './pages/Support';
import Settings from './pages/Settings';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard/*" element={<DashboardPage />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/products" element={<Products />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/support" element={<Support />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
