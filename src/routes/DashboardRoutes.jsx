import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Transactions from '../pages/Transactions';
import Portfolio from '../pages/Portfolio';
import Products from '../pages/Products';
import Learning from '../pages/Learning';
import Support from '../pages/Support';
import Settings from '../pages/Settings';

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/products" element={<Products />} />
      <Route path="/learning" element={<Learning />} />
      <Route path="/support" element={<Support />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default DashboardRoutes; 