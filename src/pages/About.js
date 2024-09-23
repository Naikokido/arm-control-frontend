import React from 'react';
import { Typography, Box, Paper, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto Mono, monospace',
  },
});

const About = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: 3 }}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            Acerca de Nosotros
          </Typography>
          <Typography variant="body1" paragraph>
            Somos una empresa dedicada al control y monitoreo de robots Niryo NED 2. Nuestra misión es proporcionar soluciones intuitivas y eficientes para la automatización industrial.
          </Typography>
          <Typography variant="body1" paragraph>
            Con años de experiencia en robótica y automatización, nuestro equipo se esfuerza por ofrecer las mejores herramientas para el control de robots, permitiendo a nuestros clientes optimizar sus procesos y aumentar su productividad.
          </Typography>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default About;