import React from 'react';
import { StyledBackground, StyledFactor } from '../stylescomp/BackgroundStyle';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { CircularProgress} from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { TempGridStyled,TempItemStyled, TempHumItemStyled, TempChartItemStyled } from '../stylescomp/TemperatureStyle';
import { CSSTransition } from 'react-transition-group';
import { FadeBox } from '../stylescomp/FadeinStyle';
import useTemperature from '../hooks/useTemperature';
import {Typography } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import TempGaugeChart from '../Chart/TempActiveShape';
import HumGaugeChart from '../Chart/HumidityActiveShape';
import TempHumidityChart from '../Chart/TempHumidityChart';
import { purple } from '@mui/material/colors';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
function TemperaturePage() {

  const {factoryTemperature,  factoryHumidity } = useTemperature()

  return (
    <StyledBackground>
      <StyledFactor>
      <CSSTransition in={true} timeout={1000} classNames="fade" appear>
      <FadeBox sx={{flexGrow:1}}>
      <Grid container spacing={2} sx={{ background: 'transparent', border: 'none' , boxShadow: 'none',}}>
      <TempGridStyled item xs={12} sm={4} md={4}>
            <TempItemStyled>

                <Box position="relative" display="inline-flex">
                  <CircularProgress 
                    variant="determinate" 
                    value={factoryTemperature} 
                    size={100} // 크기 조정
                    thickness={5} // 두께 조정
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
                    {factoryTemperature
                      ? <Typography variant="h5" style={{position: 'absolute', top: '35%'}}>
                          {Math.round(factoryTemperature)}%
                        </Typography>
                      : <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                          <CircularProgress style={{ color: purple[700] }} />
                        </div>
                    }
                  </Box>
                </Box>

          

            </TempItemStyled>
        </TempGridStyled>

        <TempGridStyled item xs={12} sm={4} md={4}>
            <TempItemStyled>

              <Box position="relative" display="inline-flex">
                <CircularProgress 
                  variant="determinate" 
                  value={factoryHumidity} 
                  size={100} // 크기 조정
                  thickness={5} // 두께 조정
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
                  ? <Typography variant="h5" style={{position: 'absolute', top: '35%'}}>
                      {Math.round(factoryHumidity)}%
                    </Typography>
                  : <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      <CircularProgress style={{ color: purple[700] }}/>
                    </div>
                }
                </Box>
              </Box>
      
            </TempItemStyled>
        </TempGridStyled>

        <TempGridStyled item xs={12} sm={4} md={4}>
        <Grid container direction="column">
          <TempGridStyled item xs={12}>
            <TempHumItemStyled>
            
              <TempGaugeChart style={{width: '80%', height: '75%'}}/>
            </TempHumItemStyled>
          </TempGridStyled>
          <TempGridStyled item xs={12}>
            <TempHumItemStyled>
              {/* 적정 습도 */}
              <HumGaugeChart style={{width: '80%', height: '75%'}}/>
            </TempHumItemStyled>
          </TempGridStyled>
        </Grid>
      </TempGridStyled>

      <TempGridStyled item xs={12} sm={12} md={12}>
          <TempChartItemStyled>
            {/* 실시간 온습도 그래프 */}
            <TempHumidityChart />
          </TempChartItemStyled>
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