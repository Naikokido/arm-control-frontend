import React, { useState } from 'react';
import { Select, MenuItem, Slider, Typography, Grid } from '@mui/material';

const tools = ['Pinza estándar', 'Ventosa', 'Pinza gran apertura', 'Electroimán', 'Destornillador'];

const ToolControl = () => {
  const [selectedTool, setSelectedTool] = useState(tools[0]);
  const [openForce, setOpenForce] = useState(50);
  const [closeForce, setCloseForce] = useState(50);

  const handleToolChange = (event) => {
    setSelectedTool(event.target.value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Control de herramienta</Typography>
      </Grid>
      <Grid item xs={12}>
        <Select
          value={selectedTool}
          onChange={handleToolChange}
          fullWidth
        >
          {tools.map((tool) => (
            <MenuItem key={tool} value={tool}>{tool}</MenuItem>
          ))}
        </Select>
      </Grid>
      {['Pinza estándar', 'Pinza gran apertura'].includes(selectedTool) && (
        <>
          <Grid item xs={12}>
            <Typography gutterBottom>Fuerza de apertura</Typography>
            <Slider
              value={openForce}
              onChange={(e, newValue) => setOpenForce(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={100}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>Fuerza de cierre</Typography>
            <Slider
              value={closeForce}
              onChange={(e, newValue) => setCloseForce(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={100}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default ToolControl;