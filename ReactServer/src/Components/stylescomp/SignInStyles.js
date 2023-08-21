import styled ,{ keyframes }from 'styled-components';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';

export const StyledSignInContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%; 
  -webkit-min-height: 100vh; //safari 여백 조정
  viewport-fit: cover;
  overflow: hidden;
  padding: 0;

  @media (max-width: 375px) {
     //화면 크기가 375px 이하일 때 변경사항
     overflow: hidden; 
     margin: 0; 
     padding: 0;
     width: 100vw; 
     height: 100vh;
     viewport-fit: cover; //safari 
  
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
  // -webkit-backdrop-filter: blur(15px); 
  backdrop-filter: blur(15px);
  padding: 4vw;
  border-radius: 15px;
  margin-top: 4vw; 
  font-size: 2vw;

  @media (max-width: 414px) {
    //화면 크기가 414px 이하일 때 Box 변경사항 
    viewport-fit: cover; //safari 
    padding: 4vw;
    margin-top: 40vw;
    font-size: 3vw;
  }

`;

export const StyledLoginButton = styled(Button)`
  background-color: transparent !important;
  color: #C0C0C0;
  width: 310px;
  height: 30px;
  margin: 10px 0 15px 12px;
  border-radius: 5px;
  border: 1px solid white !important;
  box-shadow: none;
  transition: background-color 0.3s ease;

  &:hover {
    animation: bgColorChange 0.3s forwards;
    backdrop-filter: blur(8px);
  }

  @keyframes bgColorChange {
    from {
      background-color: transparent;
    }
    to {
      background-color: rgba(124, 77, 255, 0.4);
    }
  }
`;


