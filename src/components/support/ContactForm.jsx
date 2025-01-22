import React, { useState } from 'react';
import { 
  Card, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  FormControl,
  InputLabel,
  Select,
  MenuItem 
} from '@mui/material';
import '../../css/support/ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    subject: '',
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', formData);
  };

  return (
    <Card className="contact-form-card">
      <Typography variant="h6" gutterBottom>
        Contáctanos
      </Typography>
      <Box component="form" onSubmit={handleSubmit} className="form-container">
        <FormControl fullWidth margin="normal">
          <InputLabel>Asunto</InputLabel>
          <Select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            label="Asunto"
            required
          >
            <MenuItem value="technical">Soporte Técnico</MenuItem>
            <MenuItem value="account">Cuenta</MenuItem>
            <MenuItem value="products">Productos</MenuItem>
            <MenuItem value="other">Otro</MenuItem>
          </Select>
        </FormControl>

        <TextField
          name="name"
          label="Nombre Completo"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          name="email"
          label="Correo Electrónico"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="email"
          required
        />

        <TextField
          name="message"
          label="Mensaje"
          value={formData.message}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
        />

        <Button 
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          className="submit-button"
        >
          Enviar Mensaje
        </Button>
      </Box>
    </Card>
  );
};

export default ContactForm; 