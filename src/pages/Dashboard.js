import React, { useState } from 'react';
import { Grid, Paper, Tabs, Tab, Box, ThemeProvider, createTheme } from '@mui/material';
import AxisControl from '../components/RobotControl/AxisControl';
import CoordinateControl from '../components/RobotControl/CoordinateControl';
import ToolControl from '../components/RobotControl/ToolControl';
import CameraFeed from '../components/RobotControl/CameraFeed';
import RobotInfo from '../components/RobotControl/RobotInfo';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto Mono, monospace',
  },
});

const Dashboard = () => {
  const [controlMode, setControlMode] = useState('ejes');

  const handleControlModeChange = (event, newValue) => {
    setControlMode(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: 2, background: '#f0f0f0' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper>
              <Tabs value={controlMode} onChange={handleControlModeChange} centered>
                <Tab label="Control por ejes" value="ejes" />
                <Tab label="Control por coordenadas" value="coordenadas" />
              </Tabs>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper>
              <Box p={2}>
                {controlMode === 'ejes' ? <AxisControl /> : <CoordinateControl />}
              </Box>
            </Paper>
            <Box mt={2}>
              <Paper>
                <Box p={2}>
                  <ToolControl />
                </Box>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper>
              <Box p={2}>
                <CameraFeed />
              </Box>
            </Paper>
            <Box mt={2}>
              <Paper>
                <Box p={2}>
                  <RobotInfo />
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;