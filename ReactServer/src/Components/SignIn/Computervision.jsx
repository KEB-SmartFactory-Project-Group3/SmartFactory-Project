import React from 'react';
import LiveTransmissionComponent from './LiveTransmissionComponent';
import { StyledBackground, StyledFactor } from '../stylescomp/BackgroundStyle';
import useProductsList from '../hooks/useProductsList';
import ProductListData from '../Data/ProductsListData';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {VisionGridStyled, VisionItemStyled} from '../stylescomp/ComputervisionStyle';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function Computervison() {

  return (
      <StyledBackground>
        <StyledFactor>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
             <VisionGridStyled item xs={12} sm={7} md={7}>
              <VisionItemStyled><ProductListData /></VisionItemStyled>
            </VisionGridStyled>
            <VisionGridStyled item xs={12} sm={5} md={5}>
              <VisionItemStyled> <LiveTransmissionComponent /></VisionItemStyled>
            </VisionGridStyled>
          </Grid>
        </Box>
 
        </StyledFactor>
      </StyledBackground>
  )
}


export default Computervison;