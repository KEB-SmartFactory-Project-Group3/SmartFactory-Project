import React from 'react';
import { StyledBackground, StyledFactor } from '../stylescomp/BackgroundStyle';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { TempGridStyled,TempItemStyled, TempHumItemStyled } from '../stylescomp/TemperatureStyle';
import { CSSTransition } from 'react-transition-group';
import { FadeBox } from '../stylescomp/FadeinStyle';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
function TemperaturePage() {


  return (
    <StyledBackground>
      <StyledFactor>
      <CSSTransition in={true} timeout={1000} classNames="fade" appear>
      <FadeBox sx={{flexGrow:1}}>
      <Grid container spacing={2} sx={{ background: 'transparent', border: 'none' , boxShadow: 'none',}}>
      <TempGridStyled item xs={12} sm={4} md={4}>
            <TempItemStyled>
              현재 온도
            </TempItemStyled>
        </TempGridStyled>

        <TempGridStyled item xs={12} sm={4} md={4}>
            <TempItemStyled>
              현재 습도
            </TempItemStyled>
        </TempGridStyled>

        <TempGridStyled item xs={12} sm={4} md={4}>
        <Grid container direction="column">
          <TempGridStyled item xs={12}>
            <TempHumItemStyled>
              적정 온도
            </TempHumItemStyled>
          </TempGridStyled>
          <TempGridStyled item xs={12}>
            <TempHumItemStyled>
              적정 습도
            </TempHumItemStyled>
          </TempGridStyled>
        </Grid>
      </TempGridStyled>

      <TempGridStyled item xs={12} sm={12} md={12}>
          <TempItemStyled>
            실시간 온도 그래프
          </TempItemStyled>
      </TempGridStyled>

      <TempGridStyled item xs={12} sm={12} md={12}>
          <TempItemStyled>
            일별 온습도 평균 최대 최솟값
          </TempItemStyled>
      </TempGridStyled>

      </Grid>
      </FadeBox>
      </CSSTransition>
      </StyledFactor>
    </StyledBackground>
 
  )
}

export default TemperaturePage;