import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import logoArmControl from '../../assets/logo.png';
import { useState } from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Importa el ícono de salida

const Header = ({ username }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'blue-600' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo y Nombre a la izquierda */}
        <Box display="flex" alignItems="center">
          <img src={logoArmControl} alt="logo" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
          <Typography variant="h6" sx={{ fontFamily: 'Roboto Mono, monospace', fontWeight: 'bold' }}>
            Virtual Laboratory
          </Typography>
        </Box>

        {/* Menú centrado */}
        <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex' }}>
          <Button component={Link} to="/home" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/dashboard" color="inherit">
            Dashboard
          </Button>
          <Button component={Link} to="/contact" color="inherit">
            Contact
          </Button>
          <Button component={Link} to="/about" color="inherit">
            About
          </Button>
        </Box>

        {/* Información de Usuario a la derecha */}
        <Box display="flex" alignItems="center">
          <Typography variant="body1" sx={{ marginRight: 1 }}>
            {username || 'Username'}
          </Typography>
          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <Avatar alt="Usuario" src="https://cdn-icons-png.freepik.com/512/16/16363.png" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            sx={{ mt: '49px' }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleMenuClose}>
              <Button
                component={Link}
                to="/login"
                color="inherit"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textTransform: 'none', // Evita que se ponga en mayúsculas
                  '&:hover': {
                    color: 'red', // Cambia el color a rojo cuando se pasa el cursor por encima
                  },
                }}
              >
                <ExitToAppIcon sx={{ marginRight: 1 }} /> 
                Sign out 
              </Button>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
