import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, verifyOTP } from '../services/api';
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

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const response = await loginUser(email, password);
      if (response.requiresOTP) {
        setShowOtpInput(true);
        setError("Se ha enviado un código a tu correo");
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
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
      const response = await verifyOTP(email, otpCode);
      if (response.token) {
        navigate('/dashboard');
      }
    } catch (err) {
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
          
          <form onSubmit={showOtpInput ? handleVerifyOTP : handleSubmit}>
            {!showOtpInput ? (
              <>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="andrey_lindo@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Link to="/forgot-password" className="forgot-password">Olvidé mi contraseña</Link>
                </div>
              </>
            ) : (
              <div className="form-group">
                <label>Código de verificación</label>
                <input
                  type="text"
                  placeholder="Ingresa el código de 6 dígitos"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  maxLength={6}
                />
                <p className="help-text">Revisa tu correo electrónico</p>
              </div>
            )}

            <button 
              type="submit" 
              className="sign-in-btn"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : (showOtpInput ? "Verificar" : "Iniciar sesión")}
            </button>

            {error && <p className="error-message">{error}</p>}

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
                Create an account
              </a>
            </div>
          </form>
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
};

export default LoginPage;