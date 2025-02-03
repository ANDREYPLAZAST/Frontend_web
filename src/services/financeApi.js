import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getFondoData = async (ticker) => {
  try {
    const response = await axios.get(`${API_URL}/fondo/${ticker}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error en la petición:', error);
    if (error.response) {
      throw new Error(error.response.data.mensaje || 'Error del servidor');
    } else if (error.request) {
      throw new Error('No se pudo conectar con el servidor');
    } else {
      throw new Error('Error al procesar la solicitud');
    }
  }
}; 