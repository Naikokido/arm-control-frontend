import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 2 }}>
      <Container maxWidth="lg">
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ fontFamily: 'Roboto Mono, monospace' }} // Aplica la fuente aquí
        >
          {'Copyright © '}
          <Link color="inherit" href="https://tu-sitio-web.com/" sx={{ fontFamily: 'Roboto Mono, monospace' }}>
            Control de Robot Niryo
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
