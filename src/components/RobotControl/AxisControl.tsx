import React, { useState } from 'react';
import { Slider, Typography, Grid } from '@mui/material';

const axisConfig = [
  { name: 'Rotación Base', min: 0, max: 360 },
  { name: 'Movimiento Hombro', min: 0, max: 180 },
  { name: 'Movimiento Codo', min: 0, max: 180 },
  { name: 'Rotación Muñeca', min: 0, max: 180 },
  { name: 'Inclinación Muñeca', min: 0, max: 180 },
  { name: 'Herramienta', min: 0, max: 180 },
];

const AxisControl = () => {
  const [axisValues, setAxisValues] = useState(axisConfig.map(() => 0));

  const handleSliderChange = (index) => (event, newValue) => {
    const newAxisValues = [...axisValues];
    newAxisValues[index] = newValue;
    setAxisValues(newAxisValues);
  };

  return (
    <Grid container spacing={2}>
      {axisConfig.map((axis, index) => (
        <Grid item xs={12} key={axis.name}>
          <Typography gutterBottom>
            Eje {index + 1}: {axis.name}
          </Typography>
          <Slider
            value={axisValues[index]}
            onChange={handleSliderChange(index)}
            valueLabelDisplay="auto"
            min={axis.min}
            max={axis.max}
            marks={[
              { value: axis.min, label: `${axis.min}°` },
              { value: axis.max, label: `${axis.max}°` },
            ]}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default AxisControl;