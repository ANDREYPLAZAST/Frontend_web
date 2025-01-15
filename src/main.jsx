// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'; // Aquí agregamos el Router

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>  {/* Aquí envolvemos toda la app en el Router */}
    <App />
  </BrowserRouter>
);