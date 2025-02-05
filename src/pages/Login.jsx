import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, verifyOTP } from '../services/api';
import { useAuth } from '../context/AuthContext';
// Importaciones de MUI
import { 
  Google as GoogleIcon,
  GitHub as GitHubIcon,
  Facebook as FacebookIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  AccountBalance as AccountBalanceIcon
} from '@mui/icons-material';
import "../css/Login.css";

export default function LoginPage() {
  const { login, verify2FA } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [otpCode, setOtpCode] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      title: "Potencia tus inversiones",
      description: "Accede a herramientas de simulación financiera, educación interactiva y gestión eficiente de créditos.",
      icon: <StarIcon className="feature-icon" />
    },
    {
      title: "Simulación Financiera",
      description: "Realiza proyecciones y análisis detallados de tus inversiones con nuestras herramientas avanzadas.",
      icon: <TrendingUpIcon className="feature-icon" />
    },
    {
      title: "Gestión de Créditos",
      description: "Administra y optimiza tus recursos crediticios con un sistema integral de gestión.",
      icon: <AccountBalanceIcon className="feature-icon" />
    }
  ];

  const handlePrevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide(prev => (prev === features.length - 1 ? 0 : prev + 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log('Intentando login con:', formData.email);
      const response = await login(formData.email, formData.password);
      
      console.log('Respuesta login:', response);
      
      // Si requiere 2FA o el mensaje indica verificación
      if (response.requires2FA || response.message?.includes('verifica')) {
        setShowOtpInput(true);
        setError('Por favor, verifica el código enviado a tu email');
        return;
      }

      // Si no requiere 2FA, navegamos al dashboard
      navigate('/dashboard/home');
    } catch (err) {
      console.error('Error completo:', err);
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log('Verificando OTP para:', formData.email);
      const response = await verify2FA(formData.email, otpCode);
      console.log('Respuesta verificación:', response);
      
      if (response.token) {
        navigate('/dashboard/home');
      } else {
        setError('Código de verificación inválido');
      }
    } catch (err) {
      console.error('Error en verificación:', err);
      setError(err.message || 'Error al verificar el código');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Left Section */}
      <div className="left-section">
        <h1 className="brand-logo">InvestCoop</h1>
        
        <div className="login-form">
          <h2 className="welcome-text">Bienvenido de nuevo</h2>
          <p className="instruction-text">Ingresa tus credenciales para gestionar tus fondos</p>
          
          {!showOtpInput ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="correo@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <Link to="/forgot-password" className="forgot-password">Olvidé mi contraseña</Link>
              </div>

              <button 
                type="submit" 
                className="sign-in-btn"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Iniciar sesión"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP}>
              <div className="form-group">
                <label>Código de verificación</label>
                <input
                  type="text"
                  placeholder="Ingresa el código de 6 dígitos"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  maxLength={6}
                  required
                />
                <p className="help-text">Revisa tu correo electrónico</p>
              </div>

              <button 
                type="submit" 
                className="sign-in-btn"
                disabled={isLoading}
              >
                {isLoading ? "Verificando..." : "Verificar Código"}
              </button>
            </form>
          )}

          {error && <div className="error-message">{error}</div>}

          <div className="social-login">
            <button type="button" className="social-btn google">
              <GoogleIcon className="social-icon" />
            </button>
            <button type="button" className="social-btn github">
              <GitHubIcon className="social-icon" />
            </button>
            <button type="button" className="social-btn facebook">
              <FacebookIcon className="social-icon" />
            </button>
          </div>

          <div className="create-account">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                navigate('/register');
              }}
              className="create-account-link"
            >
              Crear cuenta
            </a>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="testimonial">
          <h2>Gestión Inteligente de Fondos</h2>
          <blockquote>
            "Optimiza la gestión de tus fondos de inversión con herramientas 
            avanzadas de simulación financiera y administración de créditos."
          </blockquote>
          
          <div className="testimonial-author">
            <h3>Sistema Cooperativo</h3>
            <p>Plataforma de Gestión Financiera</p>
          </div>

          <div className="nav-buttons">
            <div className="info-card" onClick={handlePrevSlide}>
              <ArrowBackIcon className="nav-icon" />
              <div className="info-content">
                <h4>Anterior</h4>
                <p>Ver característica previa</p>
              </div>
            </div>
            <div className="info-card" onClick={handleNextSlide}>
              <ArrowForwardIcon className="nav-icon" />
              <div className="info-content">
                <h4>Siguiente</h4>
                <p>Ver más características</p>
              </div>
            </div>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-header">
            <h3>{features[currentSlide].title}</h3>
            {features[currentSlide].icon}
          </div>
          <p>{features[currentSlide].description}</p>
          <div className="slide-indicators">
            {features.map((_, index) => (
              <span 
                key={index} 
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}