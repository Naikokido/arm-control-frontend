import React from 'react';
import { Typography, Grid, TextField, Button } from '@mui/material';

const CoordinateControl = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Control por Coordenadas</Typography>
      </Grid>
      {['X', 'Y', 'Z', 'Roll', 'Pitch', 'Yaw'].map((coord) => (
        <Grid item xs={6} sm={4} key={coord}>
          <TextField
            label={coord}
            type="number"
            fullWidth
            variant="outlined"
          />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button variant="contained" color="primary">
          Mover a Coordenadas
        </Button>
      </Grid>
    </Grid>
  );
};

export default CoordinateControl;