import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { forgotPassword, verifyCode, resetPassword } from '../services/api';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
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
      await forgotPassword(emailOrDoc);
      setSuccess('Se ha enviado un código a tu correo');
      setStep(2);
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
      <form className="forgot-password-form">
        <h2 className="forgot-password-title">Restablecer Contraseña</h2>
        
        {step === 1 && (
          <>
            <input
              type="text"
              className="input-field"
              placeholder="Correo o Número de Documento"
              value={emailOrDoc}
              onChange={(e) => setEmailOrDoc(e.target.value)}
              required
            />
            
            <button type="button" className="send-code-btn" onClick={handleSendCode}>
              Enviar Código
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              className="input-field"
              placeholder="Ingresa el código de verificación"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            
            <button type="button" className="send-code-btn" onClick={handleVerifyCode}>
              Verificar Código
            </button>
          </>
        )}
        
        {step === 3 && (
          <>
            <input
              type="password"
              className="input-field"
              placeholder="Nueva Contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              className="input-field"
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="button" className="send-code-btn" onClick={handleResetPassword}>
              Restablecer Contraseña
            </button>
          </>
        )}
        
        <Link to="/" className="back-to-login">
          <ArrowBackIcon /> Volver al inicio de sesión
        </Link>
      </form>
      
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default ForgotPassword;
