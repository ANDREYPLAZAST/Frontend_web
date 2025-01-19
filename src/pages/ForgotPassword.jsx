import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword, verifyCode, resetPassword } from '../services/api';
import "../css/ForgotPassword.css";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // Paso actual
  const [emailOrDoc, setEmailOrDoc] = useState(''); // Este estado se mantiene en todos los pasos
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Paso 1: Enviar código de verificación (correo o cédula)
  const handleSendCode = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      await forgotPassword(emailOrDoc); // Solicita el envío del código
      setSuccess('Código enviado exitosamente. Verifica tu correo.');
      setStep(2); // Cambia al paso 2 de verificación
    } catch (err) {
      setError(err.message || 'Error al enviar el código');
    }
  };

  // Paso 2: Verificar el código
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const body = {};
      if (/\S+@\S+\.\S+/.test(emailOrDoc)) {
        body.email = emailOrDoc; // Si es un email, asignarlo a 'email'
      } else {
        body.numeroCedula = emailOrDoc; // Si no es un email, asignarlo a 'numeroCedula'
      }

      // Verificar el código
      await verifyCode(body, code); 
      setSuccess('Código verificado exitosamente. Ahora puedes restablecer tu contraseña.');
      setStep(3); // Cambia al paso 3 de restablecimiento de contraseña
    } catch (err) {
      setError(err.message || 'Error al verificar el código');
    }
  };

  // Paso 3: Restablecer la contraseña
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    try {
      await resetPassword(newPassword, emailOrDoc); // Restablece la contraseña
      setSuccess('Contraseña restablecida exitosamente. Puedes iniciar sesión ahora.');
      navigate('/'); // Redirigir al login
    } catch (err) {
      setError(err.message || 'Error al restablecer la contraseña');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={step === 1 ? handleSendCode : step === 2 ? handleVerifyCode : handleResetPassword}>
        {step === 1 && (
          <div className="form-fields">
            <input
              type="text"
              placeholder="Correo o Número de Documento"
              value={emailOrDoc}
              onChange={(e) => setEmailOrDoc(e.target.value)}
              required
            />
            <button type="button" onClick={handleSendCode}>Enviar Código</button>
          </div>
        )}
        {step === 2 && (
          <div className="form-fields">
            <input
              type="text"
              placeholder="Código de Verificación"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <button type="submit">Verificar Código</button>
          </div>
        )}
        {step === 3 && (
          <div className="form-fields">
            <input
              type="password"
              placeholder="Nueva Contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit">Restablecer Contraseña</button>
          </div>
        )}
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default ForgotPassword;
