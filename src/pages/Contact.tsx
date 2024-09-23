import React from 'react';
import { Typography, Box, Paper, TextField, Button, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto Mono, monospace',
  },
});

const Contact = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: 3 }}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            Contáctanos
          </Typography>
          <form>
            <TextField
              fullWidth
              label="Nombre"
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              required
              type="email"
            />
            <TextField
              fullWidth
              label="Mensaje"
              variant="outlined"
              margin="normal"
              required
              multiline
              rows={4}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2 }}
            >
              Enviar Mensaje
            </Button>
          </form>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Contact;