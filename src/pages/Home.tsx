import React from 'react';
import { Typography, Button, Box, ThemeProvider, createTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const theme = createTheme({
  typography: {
    fontFamily: 'Orbitron, sans-serif',
    h2: {
      fontWeight: 700,
      textAlign: 'center',
    },
    h5: {
      fontWeight: 400,
      textAlign: 'center',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Roboto Mono, monospace',
        },
      },
    },
  },
});

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        sx={{
          
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Bienvenido al Control de Robot Niryo NED 2
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Controla y monitorea tu robot de forma intuitiva
        </Typography>
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" size="large" sx={{ mt: 4 }}>
            Ir al Dashboard
          </Button>
        </Link>
      </Box>
    </ThemeProvider>
  );
};

export default Home;