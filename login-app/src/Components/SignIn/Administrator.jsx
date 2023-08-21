import React from 'react';
import { StyledBackground, StyledFactor } from '../stylescomp/BackgroundStyle';
import { AdminItemStyled, AdminStyledFactor } from '../stylescomp/AdministratorStyle';
import ProductionManagement from '../Data/ProductionManagement';
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


function Administrator() {

  return (
    <StyledBackground>
      <StyledFactor>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
             <VisionGridStyled item xs={12} sm={12} md={12}>
              <VisionItemStyled>
    
                  <ProductionManagement />

              </VisionItemStyled>
            </VisionGridStyled>
          </Grid>
        </Box>
         
      </StyledFactor>
    </StyledBackground>
  )
}

export default Administrator;