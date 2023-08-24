import React from 'react';
import { StyledBackground, StyledFactor } from '../stylescomp/BackgroundStyle';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { CircularProgress} from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { TempGridStyled,TempItemStyled, TempHumItemStyled, TempChartItemStyled , TempHumDBStyled} from '../stylescomp/TemperatureStyle';
import { CSSTransition } from 'react-transition-group';
import { FadeBox } from '../stylescomp/FadeinStyle';
import useTemperature from '../hooks/useTemperature';
import {Typography } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import TempGaugeChart from '../Chart/TempActiveShape';
import HumGaugeChart from '../Chart/HumidityActiveShape';
import TempHumidityChart from '../Chart/TempHumidityChart';
import { purple } from '@mui/material/colors';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import useTemperatureHumidityStats from '../hooks/useTemperatureHumidityStats';
import TempStatsBarChart from '../Chart/TempStatsBarChart';
import HumidityStatsBarChart from '../Chart/HumidityStatsBarChart';
import TemperatureDisplay from '../display/TemperatureDisplay';
import HumidityDisplay from '../display/HumidityDisplay';
import TemperatureData from '../Data/TemperatureData';

// const CustomCircularProgress = styled(CircularProgress)({
//   color: 'green', // achieved 색상 설정

//   '& .MuiCircularProgress-circle': {
//     strokeLinecap: 'round', // 원형의 끝을 둥글게 만들어줍니다.
//   },

//   '&.MuiCircularProgress-determinate': {
//     '&::before': {
//       content: '""',
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       zIndex: 1,
//       borderRadius: '50%',
//       border: '5px solid white', // remaining 색상 설정
//       boxSizing: 'border-box',
//     },
//   },
// })
// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));
function TemperaturePage() {

  const {factoryTemperature,  factoryHumidity } = useTemperature()
  const { maxTemperature, 
    minTemperature, 
    maxHumidity, 
    minHumidity, 
    avgTemperature, 
    avgHumidity} = useTemperatureHumidityStats()

  return (
    <StyledBackground>
      <StyledFactor>
      <CSSTransition in={true} timeout={1000} classNames="fade" appear>
      <FadeBox sx={{flexGrow:1}}>
      <Grid container spacing={3} sx={{ background: 'transparent', border: 'none' , boxShadow: 'none',}}>
      <TempGridStyled item xs={6} sm={4} md={4}>
            <TempItemStyled>
              <TemperatureDisplay factoryTemperature={factoryTemperature} CustomCircularProgress={CircularProgress} />
            </TempItemStyled>
        </TempGridStyled>

        <TempGridStyled item xs={6} sm={4} md={4}>
            <TempItemStyled>
              <HumidityDisplay factoryHumidity={factoryHumidity} CustomCircularProgress={CircularProgress} />
            </TempItemStyled>
        </TempGridStyled>

          <TempGridStyled item xs={12} sm={4} md={4}>
            <TempHumItemStyled>
            
              <TempGaugeChart style={{width: '100%', height: '100%'}}/>
            </TempHumItemStyled>
          </TempGridStyled>

          {/* 작은 화면일 때 적정온도 다음에 적정습도 나오도록 코드 수정 */}
          <TempGridStyled item xs={6} sm={4} md={4} sx={{ display: { xs: 'block', sm: 'none' } }}>
            <TempHumItemStyled>
                <HumGaugeChart style={{width: '80%', height: '75%'}}/>
            </TempHumItemStyled>
          </TempGridStyled>

      <TempGridStyled item xs={12} sm={4} md={4}>
          <TempChartItemStyled borderColor='#e040fb'height="39vh">
            {/* 실시간 온습도 그래프 */}
            <TempHumidityChart />
          </TempChartItemStyled>
      </TempGridStyled>

      <TempGridStyled item xs={12} sm={4} md={4}>
          <TempItemStyled>
            <Typography variant="subtitle1" mt={1} fontWeight="bold">
              온습도 평균 최대 최소값
            </Typography>
            
            <TempStatsBarChart  avgTemperature={avgTemperature} 
                                maxTemperature={maxTemperature} 
                                minTemperature={minTemperature}  
            />
             <HumidityStatsBarChart  avgHumidity={avgHumidity} 
                                maxHumidity={maxHumidity} 
                                minHumidity={minHumidity}  
            />

          </TempItemStyled>
      </TempGridStyled>

      <TempGridStyled item xs={12} sm={4} md={4} >
        <Grid container direction="column" spacing={2}>
          <Grid item  sx={{ display: { xs: 'none', sm: 'block' } }}> 
            <TempHumItemStyled>
               {/* 적정 습도 */}
              <HumGaugeChart style={{width: '100%', height: '100%'}}/>
            </TempHumItemStyled>
          </Grid>
          <Grid item >
            <TempHumDBStyled>
               {/* 온도DB  */}
              <TemperatureData />
            </TempHumDBStyled>
          </Grid>
        </Grid>
      </TempGridStyled>  

      </Grid>
      </FadeBox>
      </CSSTransition>
      </StyledFactor>
    </StyledBackground>
 
  )
}

export default TemperaturePage;