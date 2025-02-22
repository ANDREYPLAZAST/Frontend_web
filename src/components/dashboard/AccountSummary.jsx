import React, { useState, useEffect } from 'react';
import { Card, Box, Typography, LinearProgress, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { 
  AccountBalance as AccountIcon,
  CreditCard as CreditIcon,
  CalendarToday as CalendarIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { getAvailableCredit, updateSavingsGoal } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import '../../css/dashboard/AccountSummary.css';

const AccountSummary = ({ balance = 0, savingsGoal = 0 }) => {
  const [creditInfo, setCreditInfo] = useState({
    disponible: 0,
    tieneCredito: false
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [newGoal, setNewGoal] = useState(savingsGoal);
  const { updateUserData } = useAuth();

  useEffect(() => {
    const loadCreditInfo = async () => {
      try {
        const response = await getAvailableCredit();
        setCreditInfo({
          disponible: response.creditoDisponible || 0,
          tieneCredito: response.tieneCredito || false
        });
      } catch (error) {
        console.error('Error cargando información de crédito:', error);
      }
    };

    loadCreditInfo();
  }, []);

  const handleUpdateGoal = async () => {
    try {
      const response = await updateSavingsGoal(newGoal);
      updateUserData({
        user: {
          ...response.user,
          metaAhorro: response.metaAhorro
        }
      });
      setOpenDialog(false);
    } catch (error) {
      console.error('Error actualizando meta:', error);
    }
  };

  // Asegurarnos de que los valores sean números
  const numericBalance = Number(balance) || 0;
  const numericSavingsGoal = Number(savingsGoal) || 0;
  const savingsProgress = numericSavingsGoal > 0 ? (numericBalance / numericSavingsGoal) * 100 : 0;

  return (
    <Card className="account-summary">
      <Box className="summary-grid">
        {/* Balance Total (se actualiza automáticamente con las transacciones) */}
        <Box className="summary-item">
          <Box className="summary-header">
            <AccountIcon />
            <Typography variant="subtitle2">Balance Total</Typography>
          </Box>
          <Typography variant="h4">${numericBalance.toFixed(2)}</Typography>
          <Box className="savings-progress">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="body2">
                Meta de ahorro: ${numericSavingsGoal.toFixed(2)}
              </Typography>
              <IconButton size="small" onClick={() => setOpenDialog(true)}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={Math.min(savingsProgress, 100)} 
              className="progress-bar"
            />
          </Box>
        </Box>

        {/* Crédito Disponible (se actualiza según el estado del usuario) */}
        <Box className="summary-item">
          <Box className="summary-header">
            <CreditIcon />
            <Typography variant="subtitle2">Crédito Disponible</Typography>
          </Box>
          <Typography variant="h4">
            ${creditInfo.disponible.toFixed(2)}
          </Typography>
          <Button 
            variant="outlined" 
            className="action-button"
            disabled={!creditInfo.tieneCredito}
          >
            {creditInfo.tieneCredito ? 'Solicitar Crédito' : 'No Disponible'}
          </Button>
        </Box>
      </Box>

      {/* Diálogo para editar meta de ahorro */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Actualizar Meta de Ahorro</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nueva Meta"
            type="number"
            fullWidth
            value={newGoal}
            onChange={(e) => setNewGoal(Number(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={handleUpdateGoal} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default AccountSummary; 