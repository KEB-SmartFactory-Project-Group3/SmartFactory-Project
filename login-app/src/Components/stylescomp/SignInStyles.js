import styled ,{ keyframes }from 'styled-components';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export const StyledSignInContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%; 
  min-height: 100vh;
  viewport-fit: contain;
  overflow: hidden;

  @media (max-width: 375px) {
     //화면 크기가 375px 이하일 때 변경사항
     overflow: hidden; 
    //  margin: 0; 
    //  padding: 0;
    //  width: 100%; 
    //  height: 100%;
    //  viewport-fit: cover; //safari 
  
  } 
`;

export const StyledGridItem = styled(Grid)`
  display: flex;
  align-items: center;
  margin-bottom: 10px; 
`;

export const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justifyContent: center;
  background: transparent;
  border: 2px solid rgba(255,255,255, .5);
  //배경화면 지정 후 bg삭제
  background-color: rgba(255, 255, 255, 0.2);
  background-size: contain;
  background-repeat: no-repeat;
  -webkit-backdrop-filter: blur(15px);
  padding: 2vw;
  border-radius: 15px;
  margin-top: 4vw; 
  font-size: 2vw;

  @media (max-width: 390px) {
    //화면 크기가 390px 이하일 때 Box 변경사항 
    viewport-fit: cover; //safari 
    padding: 4vw;
    margin-top: 40vw;
    font-size: 3vw;
  }

`;

