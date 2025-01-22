import React from 'react';
import { Box, Container, Typography, Grid, Card } from '@mui/material';
import Sidebar from '../components/dashboard/Sidebar';
import ProfileSettings from '../components/settings/ProfileSettings';
import SecuritySettings from '../components/settings/SecuritySettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import '../css/pages/Settings.css';

const Settings = () => {
  return (
    <Box className="dashboard-layout">
      <Sidebar />
      <Box className="main-content">
        <Container>
          <Typography variant="h5" className="page-title">
            Configuración
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ProfileSettings />
            </Grid>

            <Grid item xs={12} md={6}>
              <SecuritySettings />
            </Grid>

            <Grid item xs={12} md={6}>
              <NotificationSettings />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Settings; 