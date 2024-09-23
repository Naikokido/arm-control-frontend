import React from 'react';
import { Typography, Grid } from '@mui/material';

const RobotInfo = () => {
  const robotData = {
    Position: {
      Coord: { X: 10, Y: 5, Z: 14 },
      Ejes: { J1: 10, J2: 5, J3: 14, J4: 3, J5: 2, J6: 4 }
    },
    Robot: {
      IP: '10.1.10.129',
      Nombre: 'Niryo Ned 2',
      Herramienta: 'Pinzas'
    },
    Camara: {
      IP: '10.1.10.115',
      Nombre: 'Camera1'
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Datos del robot</Typography>
      </Grid>
      {Object.entries(robotData).map(([category, data]) => (
        <Grid item xs={12} key={category}>
          <Typography variant="subtitle1">{category}</Typography>
          {Object.entries(data).map(([key, value]) => (
            <Typography variant="body2" key={key}>
              {key}: {typeof value === 'object' ? JSON.stringify(value) : value}
            </Typography>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default RobotInfo;