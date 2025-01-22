import React from 'react';
import { Box, Container, Typography, Grid, Card } from '@mui/material';
import Sidebar from '../components/dashboard/Sidebar';
import CourseCard from '../components/learning/CourseCard';
import LearningPath from '../components/learning/LearningPath';
import '../css/pages/Learning.css';

const Learning = () => {
  const courses = [
    {
      title: 'Fundamentos Financieros',
      description: 'Aprende los conceptos básicos de finanzas personales',
      duration: '2 horas',
      level: 'Principiante',
      progress: 0
    },
    // ... más cursos
  ];

  return (
    <Box className="dashboard-layout">
      <Sidebar />
      <Box className="main-content">
        <Container>
          <Typography variant="h5" className="page-title">
            Educación Financiera
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card className="courses-section">
                <Typography variant="h6">Cursos Disponibles</Typography>
                <Grid container spacing={2}>
                  {courses.map((course, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <CourseCard {...course} />
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <LearningPath />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Learning; 