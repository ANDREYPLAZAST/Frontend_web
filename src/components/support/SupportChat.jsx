import React, { useState } from 'react';
import { 
  Card, 
  Box, 
  Typography, 
  TextField, 
  IconButton,
  Avatar,
  Paper 
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import '../../css/support/SupportChat.css';

const SupportChat = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'bot',
      message: '¡Hola! ¿En qué puedo ayudarte hoy?',
      timestamp: new Date()
    }
  ]);

  const handleSend = () => {
    if (message.trim()) {
      setChatHistory([
        ...chatHistory,
        {
          type: 'user',
          message: message.trim(),
          timestamp: new Date()
        }
      ]);
      setMessage('');
      // Aquí iría la lógica para procesar el mensaje y obtener respuesta
    }
  };

  return (
    <Card className="chat-card">
      <Typography variant="h6" className="chat-header">
        Chat de Soporte
      </Typography>

      <Box className="chat-messages">
        {chatHistory.map((chat, index) => (
          <Box
            key={index}
            className={`message-container ${chat.type === 'user' ? 'user' : 'bot'}`}
          >
            <Avatar className={`avatar ${chat.type}`}>
              {chat.type === 'user' ? 'U' : 'S'}
            </Avatar>
            <Paper className="message-bubble">
              <Typography>{chat.message}</Typography>
              <Typography variant="caption" className="timestamp">
                {chat.timestamp.toLocaleTimeString()}
              </Typography>
            </Paper>
          </Box>
        ))}
      </Box>

      <Box className="chat-input">
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe tu mensaje..."
          fullWidth
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <IconButton 
          color="primary" 
          onClick={handleSend}
          disabled={!message.trim()}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default SupportChat; 