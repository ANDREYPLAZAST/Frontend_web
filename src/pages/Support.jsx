import React from 'react';
import { Box, Container, Typography, Grid, Card } from '@mui/material';
import Sidebar from '../components/dashboard/Sidebar';
import FAQSection from '../components/support/FAQSection';
import ContactForm from '../components/support/ContactForm';
import SupportChat from '../components/support/SupportChat';
import '../css/pages/Support.css';

const Support = () => {
  return (
    <Box className="dashboard-layout">
      <Sidebar />
      <Box className="main-content">
        <Container>
          <Typography variant="h5" className="page-title">
            Centro de Ayuda
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <FAQSection />
              <ContactForm />
            </Grid>

            <Grid item xs={12} md={4}>
              <SupportChat />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Support; 