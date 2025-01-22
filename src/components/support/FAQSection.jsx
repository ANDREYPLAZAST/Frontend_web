import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const FAQSection = () => {
  const faqs = [
    {
      question: '¿Cómo solicito un crédito?',
      answer: 'Puede solicitar un crédito desde la sección "Productos" seleccionando el tipo de crédito que desea y siguiendo los pasos indicados.'
    },
    {
      question: '¿Cómo actualizo mis datos personales?',
      answer: 'Puede actualizar sus datos personales en la sección "Configuración" en el apartado de "Perfil Personal".'
    },
    // Más preguntas frecuentes...
  ];

  return (
    <Box className="faq-section">
      <Typography variant="h6" gutterBottom>
        Preguntas Frecuentes
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FAQSection; 