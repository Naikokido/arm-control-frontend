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
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Importa el ícono de salida
import AccountCircle from "@mui/icons-material/AccountCircle"; // Importa el ícono de usuario
import { Slide } from "@mui/material"; // Para la animación de deslizamiento

const Header = ({ username, email }: { username?: string; email?: string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "blue-600" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo y Nombre a la izquierda */}
        <Box display="flex" alignItems="center">
          <img
            src={logoArmControl}
            alt="logo"
            style={{ width: "40px", height: "40px", marginRight: "10px" }}
          />
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Orbitron, sans-serif", // Aplica la fuente Orbitron
              fontWeight: "700", // Puedes ajustar el peso de la fuente si es necesario
            }}
          >
            Virtual Laboratory
          </Typography>
        </Box>

        {/* Menú centrado */}
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
          }}
        >
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
          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <AccountCircle sx={{ fontSize: 40 }} /> {/* Ícono de usuario */}
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
            TransitionComponent={Slide} // Añadimos la animación de deslizamiento
            // TransitionProps={{ direction: "left" }} // Definimos que se deslice hacia el lado
          >
            <Box sx={{ padding: 2, textAlign: "center" }}>
              <AccountCircle sx={{ fontSize: 64, margin: "0 auto" }} />{" "}
              {/* Ícono grande en el menú */}
              <Typography variant="h6" sx={{ mt: 1 }}>
                {username || "Username"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {email || "user@example.com"}
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
                    color: "red", // Cambia el color a rojo cuando se pasa el cursor por encima
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
