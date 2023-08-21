// HumidityDisplay.js
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { purple } from '@mui/material/colors';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

function getHumidityColor(value) {
  if (value <= 30) {
    return '#3d5afe';
  } else if (value > 30 && value <= 60) {
    return '#64dd17';
  } else {
    return '#dd2c00';
  }
}

function HumidityDisplay({ factoryHumidity, CustomCircularProgress }) {
  return (
    <Box display="flex">
      <Box 
        sx={{
          width: '100%', 
          height: '100%', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid white',
          borderRadius: '5px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(5px)'
        }}
      >
        <WaterDropIcon 
              sx={{ fontSize: '5vw', color: getHumidityColor(factoryHumidity) }}/>
      </Box>

      <Box position="relative" display="inline-flex" ml={2}>
      <Box position="relative" display="inline-flex" flexDirection="column" alignItems="center" ml={2}>
        <CustomCircularProgress 
          variant="determinate" 
          value={factoryHumidity} 
          size={100}
          thickness={5}
          style={{ color: getHumidityColor(factoryHumidity) }}
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {factoryHumidity 
            ? <Typography variant="h5" style={{position: 'absolute', top: '25%'}}>
                {Math.round(factoryHumidity)}%
              </Typography>
            : <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CustomCircularProgress style={{ color: purple[700] }}/>
              </div>
          }
        </Box>
     
        <Typography variant="subtitle1" mt={1} fontWeight="bold">
          현재 습도
        </Typography>
      </Box>

      </Box>
    </Box>
  );
}

export default HumidityDisplay;
