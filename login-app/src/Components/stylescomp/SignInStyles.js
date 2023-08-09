import styled ,{ keyframes }from 'styled-components';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const colorAnimation = keyframes`
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
`;

export const StyledSignInContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  background: linear-gradient(45deg,#d2001a,#7462ff,#221266,#9fa8da);
  background-size: 300% 300%;
  animation: ${colorAnimation}  12s ease-in-out infinite;
  background-position: center;
  width: 100%; 
  height: 100vh;

  @media (max-width: 768px) {
     //화면 크기가 768px 이하일 때 변경사항 
  
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
  background: transparent;
  border: 2px solid rgba(255,255,255, .5);
  //배경화면 지정 후 bg삭제
  background-color: rgba(255, 255, 255, 0.2);
  background-size: contain;
  background-repeat: no-repeat;
  backdrop-filter: blur(15px);
  padding: 30px;
  border-radius: 15px;
  width: 350px;
  height: 275px;
  margin-top: 200px; 

  @media (max-width: 768px) {
    //화면 크기가 768px 이하일 때 Box 변경사항 
    width: 100%; 
    height: 100vh;
  }
`;