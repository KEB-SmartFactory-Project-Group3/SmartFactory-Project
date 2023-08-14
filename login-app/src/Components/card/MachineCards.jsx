// MachineCards.jsx
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';



export const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        현재 생산량
      </Typography>

      <Grid item xs={12} sm={6} md={6}>
    
      </Grid>
     
      <Typography variant="body2">
        지금까지 현재 생산량은
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
  
  </React.Fragment>

)


export const OutlinedCard = () => (
  <Box sx={{ minWidth: 275 }}>
  <Card variant="outlined">{card}</Card>
  </Box>
);


