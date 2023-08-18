import React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { StyledBackground, StyledFactor, LandStyledFactor } from '../stylescomp/BackgroundStyle';
import { CSSTransition } from 'react-transition-group';
import { FadeBox } from '../stylescomp/FadeinStyle';
import {GridItemStyled, SubmitContainer, StyledTextField, ItemStyledChart, GridItemStyledChart, ItemStyledCount, RateLabel, DigitalClockStyle, ItemStyledTime, ButtonStyled, GridContainerStyled, GridItemStyledTime} from '../stylescomp/MachineStyle';
import { TempGridStyled,TempItemStyled, TempHumItemStyled } from '../stylescomp/TemperatureStyle';
import { LandGrid, LandItem, LandItemVision, PredictCountItem, TitrationItem } from '../stylescomp/LandingStyle';
import TargetDonutChart from '../Chart/TargetCountChart';
import BasicBars from '../Chart/CountCompare';
import useMachineCount from '../hooks/useMachineCount';
import TempHumidityChart from '../Chart/TempHumidityChart';
import RealTimeLineChart from '../Chart/RealTimeLineChart';
import useTimeRecorder from '../hooks/customMachine';
import useMachineRate from '../hooks/useMachineRate';
import Icon from '@mui/material/Icon';
import { Typography } from '@mui/material';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function LandingPage() {

    const {count, defectiveCount, targetCount} = useMachineCount()
    const {nowRate} = useMachineRate()

    // 남은 예상 시간, 남은 생산량 로컬 스토리지에서 가져옴
    const rawRemainingItems = localStorage.getItem("remainingItems")
    const remainingItemsFromStorage = rawRemainingItems ? parseInt( rawRemainingItems ) : 0
   
    function convertTimeToSeconds(timeString) {
      const [hours, minutes, seconds] = timeString.split(':').map(parseFloat);
      return (hours * 3600) + (minutes * 60) + seconds;
  }
  
    const rawRemainingSeconds = localStorage.getItem("remainingSeconds");
    const remainingSecondsFromStorage = rawRemainingSeconds ? convertTimeToSeconds(rawRemainingSeconds) : 0;

  return (
    <StyledBackground>
      <StyledFactor>
      <CSSTransition in={true} timeout={1000} classNames="fade" appear>
      <FadeBox sx={{flexGrow:1}}>
      <Grid container spacing={2} sx={{ background: 'transparent', border: 'none' , boxShadow: 'none',}}>

        <LandGrid item xs={12} md={2}>
          <ItemStyledCount borderColor='#651fff'>
            도달률
            <TargetDonutChart nowRate={nowRate} />
          </ItemStyledCount>
        </LandGrid>

       {/* 앞으로 남은 생산량 & 예상 남은 시간 */}
        <LandGrid item xs={12} md={2}>
          <Grid container direction="column">
            <LandGrid item xs={12}>
              <PredictCountItem highlight={remainingItemsFromStorage > 0}>
                 앞으로 남은 생산량
                <Typography variant="h6"  style={{ color: '#0f0' }}>
                    {remainingItemsFromStorage}
                </Typography>
              </PredictCountItem>
            </LandGrid>
            <LandGrid item xs={12}>
              <PredictCountItem highlightTime={remainingSecondsFromStorage > 0}>
                예상 남은 시간
                <Typography variant="h6"  style={{ color: '#ffeb3b' }}>
                {remainingSecondsFromStorage }
                </Typography>
              </PredictCountItem>
            </LandGrid>
          </Grid>
        </LandGrid>

        {/* 현재 생산량 */}
        <LandGrid item xs={12} md={3}>
          <ItemStyledCount>
            현재 생산량
          </ItemStyledCount>
        </LandGrid>

        {/* 컴퓨터 비전 */}
        <LandGrid item xs={12} md={5}>
          <LandItem>
            컴퓨터 비전
          </LandItem>
        </LandGrid>

        {/* 다음 줄: 기계 차트 */}
        <TempGridStyled item xs={12} md={5}>
          <TempItemStyled>
            기계 차트
          </TempItemStyled>
        </TempGridStyled>

        {/* 다음 줄: 가동 시간 */}
        <TempGridStyled item xs={12} md={2}>
          <TempItemStyled>
            가동 시간
          </TempItemStyled>
        </TempGridStyled>
       

      {/* 다음줄 */}

      <GridItemStyled item xs={12} md={6}>
        <TempItemStyled>
          실시간 온도 그래프
          <TempHumidityChart />
        </TempItemStyled>
      </GridItemStyled>

      <GridItemStyled item xs={6} md={2}>
        <TempItemStyled>
          현재온도
        </TempItemStyled>
      </GridItemStyled>

      <GridItemStyled item xs={6} md={2}>
        <TempItemStyled>
          현재 습도
        </TempItemStyled>
      </GridItemStyled>

      <GridItemStyled item xs={12} md={2}>
        <Grid container direction="column">
          <Grid item xs={6}>
            <TitrationItem>
              적정 온도
            </TitrationItem>
          </Grid>
          <Grid item xs={6}>
            <TitrationItem>
              적정 습도
            </TitrationItem>
          </Grid>
        </Grid>
      </GridItemStyled>

      </Grid>
      </FadeBox>
      </CSSTransition>


      </StyledFactor>
    </StyledBackground>

  )
}


export default LandingPage;