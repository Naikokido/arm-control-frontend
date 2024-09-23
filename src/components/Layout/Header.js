import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import logo from '../../assets/logo.png';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            height: 40,
            marginRight: 2,
          }}
        />
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontFamily: 'Roboto Mono, monospace',
          }}
        >
          ArmControl
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            sx={{ fontFamily: 'Roboto Mono, monospace' }}
          >
            Inicio
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/dashboard"
            sx={{ fontFamily: 'Roboto Mono, monospace' }}
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/about"
            sx={{ fontFamily: 'Roboto Mono, monospace' }}
          >
            Acerca de
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/contact"
            sx={{ fontFamily: 'Roboto Mono, monospace' }}
          >
            Contacto
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;