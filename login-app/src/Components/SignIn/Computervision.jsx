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

  const {
    serialnum,
    liststate,
    listcount,
    listdefect,
    productionTime
  } = useProductsList()

  return (
      <StyledBackground>
        <StyledFactor>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {Array.from(Array(2)).map((_, index) => (
              <VisionGridStyled item xs={12} sm={12} md={12} key={index}>
                <VisionItemStyled>{index === 0 ? "computervision" : "data grid"}</VisionItemStyled>
              </VisionGridStyled>
            ))}
          </Grid>
        </Box>

        {/* <LiveTransmissionComponent /> */}
        
        {/* <ProductListData /> */}
 

        </StyledFactor>
      </StyledBackground>
  )
}


export default Computervison;