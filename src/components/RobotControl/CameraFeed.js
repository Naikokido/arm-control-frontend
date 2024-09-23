import React from 'react';
import { Box, Typography } from '@mui/material';

const CameraFeed = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="300px"
      border="1px solid #ccc"
      borderRadius="4px"
    >
      <Box
        width="60px"
        height="60px"
        bgcolor="#999"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="50%"
        mb={2}
      >
        <Typography variant="h5" color="white">
          ?
        </Typography>
      </Box>
      <Typography variant="body2" color="textSecondary">
        No se ha recibido señal de la cámara
      </Typography>
    </Box>
  );
};

export default CameraFeed;