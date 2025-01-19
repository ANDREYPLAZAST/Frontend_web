import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../services/api';
import "../css/ForgotPassword.css";

const ForgotPassword = () => {
  const [emailOrDoc, setEmailOrDoc] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await forgotPassword(emailOrDoc);
      setSuccess('Se ha enviado un código de verificación a tu correo.');
      navigate('/verify-code');
    } catch (err) {
      setError(err.message || 'Error al enviar el código');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Correo o Número de Documento"
          value={emailOrDoc}
          onChange={(e) => setEmailOrDoc(e.target.value)}
          required
        />
        <button type="submit">Enviar Código</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default ForgotPassword; 