import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import "../css/Register.css";
import { Select, MenuItem } from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    password: '',
    tipoDocumento: 'CC',
    numeroCedula: '',
    numeroTelefonico: '',
    pais: 'CO',
    estado: '',
    prefix: '+57'
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const countryOptions = [
    { code: 'CO', prefix: '+57', name: 'Colombia' },
    { code: 'MX', prefix: '+52', name: 'México' },
    { code: 'ES', prefix: '+34', name: 'España' },
    { code: 'US', prefix: '+1', name: 'Estados Unidos' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    setFormData(prev => ({
      ...prev,
      numeroTelefonico: numericValue
    }));
  };

  const handlePrefixChange = (event) => {
    setFormData(prev => ({
      ...prev,
      prefix: event.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    console.log('Datos enviados:', formData);

    try {
      const response = await registerUser(formData);
      console.log('Usuario registrado:', response);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Error en el registro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <div className="features-container">
          <h2>Beneficios de unirte</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Gestión Inteligente</h3>
              <p>Administra tus fondos con herramientas avanzadas</p>
            </div>
            <div className="feature-card">
              <h3>Simulación Financiera</h3>
              <p>Proyecta y analiza tus inversiones</p>
            </div>
            <div className="feature-card">
              <h3>Educación Interactiva</h3>
              <p>Aprende sobre finanzas e inversiones</p>
            </div>
            <div className="feature-card">
              <h3>Soporte 24/7</h3>
              <p>Asistencia personalizada cuando la necesites</p>
            </div>
          </div>
        </div>
      </div>

      <div className="register-right">
        <div className="register-form-container">
          <h1 className="brand-logo">InvestCoop</h1>
          <h2 className="welcome-text">Crear Cuenta Nueva</h2>
          <p className="instruction-text">Únete a nuestra plataforma de gestión de fondos</p>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-row names-row">
              <div className="form-group">
                <input
                  type="text"
                  name="nombres"
                  placeholder="Nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="apellidos"
                  placeholder="Apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row document-row">
              <div className="form-group document-type">
                <select
                  name="tipoDocumento"
                  value={formData.tipoDocumento}
                  onChange={handleChange}
                  required
                >
                  <option value="CC">CC</option>
                  <option value="CE">CE</option>
                  <option value="PS">PS</option>
                </select>
              </div>
              <div className="form-group document-number">
                <input
                  type="text"
                  name="numeroCedula"
                  placeholder="Número de Documento"
                  value={formData.numeroCedula}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <select
                  name="pais"
                  value={formData.pais}
                  onChange={handleChange}
                  required
                >
                  <option value="CO">Colombia</option>
                  <option value="US">Estados Unidos</option>
                  <option value="ES">España</option>
                  <option value="MX">México</option>
                </select>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="estado"
                  placeholder="Estado/Departamento"
                  value={formData.estado}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row phone-row">
              <div className="form-group phone-prefix">
                <select
                  value={formData.prefix}
                  onChange={handlePrefixChange}
                  className="prefix-select"
                >
                  <option value="+57" data-country="CO">🇨🇴 +57</option>
                  <option value="+52" data-country="MX">🇲🇽 +52</option>
                  <option value="+34" data-country="ES">🇪🇸 +34</option>
                  <option value="+1" data-country="US">🇺🇸 +1</option>
                </select>
              </div>
              <div className="form-group phone-number">
                <input
                  type="tel"
                  name="numeroTelefonico"
                  placeholder="Número Telefónico"
                  value={formData.numeroTelefonico}
                  onChange={handlePhoneChange}
                  required
                />
              </div>
            </div>

            <div className="form-group centered-input">
              <input
                type="email"
                name="email"
                placeholder="Correo Electrónico"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group centered-input">
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="register-btn">
              {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
            </button>

            <button 
              type="button"
              onClick={() => navigate('/')}
              className="back-to-login"
            >
              <ArrowBackIcon /> Volver al inicio de sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register; 