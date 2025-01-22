import React from 'react';
import { 
  Card, 
  Box, 
  Typography, 
  Stepper, 
  Step, 
  StepLabel, 
  StepContent,
  Button 
} from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import '../../css/learning/LearningPath.css';

const LearningPath = () => {
  const steps = [
    {
      label: 'Fundamentos Financieros',
      description: 'Aprende los conceptos básicos de finanzas personales y gestión de dinero.',
      completed: true
    },
    {
      label: 'Inversiones Básicas',
      description: 'Descubre los diferentes tipos de inversiones y cómo empezar a invertir.',
      completed: false,
      active: true
    },
    {
      label: 'Estrategias Avanzadas',
      description: 'Profundiza en estrategias de inversión y diversificación de portafolio.',
      completed: false
    },
    {
      label: 'Planificación Financiera',
      description: 'Aprende a crear un plan financiero completo para tu futuro.',
      completed: false
    }
  ];

  return (
    <Card className="learning-path-card">
      <Typography variant="h6" gutterBottom>
        Tu Ruta de Aprendizaje
      </Typography>

      <Box className="progress-section">
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Progreso General
        </Typography>
        <Typography variant="h4" color="primary">
          25%
        </Typography>
      </Box>

      <Stepper orientation="vertical" className="learning-stepper">
        {steps.map((step, index) => (
          <Step key={index} active={step.active} completed={step.completed}>
            <StepLabel
              StepIconProps={{
                icon: step.completed ? <CheckCircleIcon color="success" /> : index + 1
              }}
            >
              <Typography variant="subtitle2">{step.label}</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body2" color="textSecondary">
                {step.description}
              </Typography>
              {step.active && (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className="continue-button"
                >
                  Continuar
                </Button>
              )}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Card>
  );
};

export default LearningPath; 