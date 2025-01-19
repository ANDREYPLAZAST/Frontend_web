import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyCode } from '../services/api';
import "../css/VerifyCode.css";

const VerifyCode = () => {
  const [code, setCode] = useState('');
  const [emailOrDoc, setEmailOrDoc] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Función para enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Determinar si es un email o número de documento
      const body = {};
      if (/\S+@\S+\.\S+/.test(emailOrDoc)) {
        body.email = emailOrDoc; // Si es un email, asignarlo a 'email'
      } else {
        body.numeroCedula = emailOrDoc; // Si no es un email, asignarlo a 'numeroCedula'
      }

      // Llamar a la función para verificar el código
      const response = await verifyCode(body, code);

      // Almacenar el email o número de documento en el estado
      const userIdentifier = emailOrDoc; // Almacena el email o número de documento

      setSuccess('Código verificado exitosamente. Ahora puedes restablecer tu contraseña.');
      
      // Redirigir a la página de restablecimiento de contraseña y pasar el identificador del usuario
      navigate('/reset-password', { state: { userIdentifier } });
    } catch (err) {
      setError(err.message || 'Error al verificar el código');
    }
  };

  return (
    <div className="verify-code-container">
      <h2>Verificar Código</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Código de Verificación"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Correo o Número de Documento"
          value={emailOrDoc}
          onChange={(e) => setEmailOrDoc(e.target.value)}
          required
        />
        <button type="submit">Verificar Código</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default VerifyCode;
