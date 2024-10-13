import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import logoArmControl from "../../assets/logo.png";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from '@mui/icons-material/Menu';
import { Slide } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAuth } from "../../context/AuthContext"; // Importar el contexto de autenticación

const Header = () => {
  const { user, logout } = useAuth(); // Obtenemos la información del usuario y la función de logout del contexto
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const open = Boolean(anchorEl);

  const isMobile = useMediaQuery('(max-width:600px)');

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout(); // Llamamos la función de logout del contexto para cerrar sesión
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "blue-600" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <img
            src={logoArmControl}
            alt="logo"
            style={{ width: isMobile ? '30px' : '40px', height: isMobile ? '30px' : '40px', marginRight: "10px" }}
          />
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Orbitron, sans-serif",
              fontWeight: "700",
              fontSize: isMobile ? '16px' :'24px',
            }}
          >
            Virtual Laboratory
          </Typography>
        </Box>

        {!isMobile ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 2 }}>
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
        ) : (
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleMobileMenu}
          >
            <MenuIcon />
          </IconButton>
        )}

        {mobileMenuOpen && isMobile && (
          <Box
            sx={{
              position: 'absolute',
              top: '64px',
              right: 0,
              backgroundColor: 'blue',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Button component={Link} to="/home" color="inherit" onClick={toggleMobileMenu}>
              Home
            </Button>
            <Button component={Link} to="/dashboard" color="inherit" onClick={toggleMobileMenu}>
              Dashboard
            </Button>
            <Button component={Link} to="/contact" color="inherit" onClick={toggleMobileMenu}>
              Contact
            </Button>
            <Button component={Link} to="/about" color="inherit" onClick={toggleMobileMenu}>
              About
            </Button>
          </Box>
        )}

        <Box display="flex" alignItems="center" sx={{ flexGrow: 1, justifyContent: "flex-end" }}>
          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <AccountCircle sx={{ fontSize: isMobile ? 30 : 40 }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            sx={{ mt: "49px" }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            TransitionComponent={Slide}
          >
            <Box sx={{ padding: 2, textAlign: "center" }}>
              <AccountCircle sx={{ fontSize: 64, margin: "0 auto" }} />
              <Typography variant="h6" sx={{ mt: 1 }}>
                {user?.username || "Username"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email || "user@uoh.cl"}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleMenuClose}>
              <Button
                component={Link}
                to="/login"
                color="inherit"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textTransform: "none",
                  "&:hover": {
                    color: "red",
                  },
                }}
                onClick={handleLogout}
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
