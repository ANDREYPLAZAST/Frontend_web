import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, LinearProgress } from '@mui/material';

const CourseCard = ({ title, description, duration, level, progress }) => {
  return (
    <Card className="course-card">
      <CardMedia
        component="img"
        height="140"
        image="/path-to-course-image.jpg"
        alt={title}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {description}
        </Typography>
        <Box className="course-info">
          <Typography variant="caption">
            Duración: {duration}
          </Typography>
          <Typography variant="caption">
            Nivel: {level}
          </Typography>
        </Box>
        <Box className="progress-section">
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="caption">
            {progress}% Completado
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CourseCard; 