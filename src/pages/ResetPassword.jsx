import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/api'; // Asegúrate de tener esta función en tu API
import "../css/ResetPassword.css"; // Crea un archivo CSS para estilos

const ResetPassword = () => {
  const location = useLocation();
  const { userIdentifier } = location.state || {}; // Obtener el identificador del usuario
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await resetPassword(newPassword, userIdentifier); // Llama a la función de API y pasa el identificador
      setSuccess('Contraseña restablecida exitosamente. Puedes iniciar sesión ahora.');
      navigate('/'); // Redirigir al login
    } catch (err) {
      setError(err.message || 'Error al restablecer la contraseña');
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleSubmit}>
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
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default ResetPassword;