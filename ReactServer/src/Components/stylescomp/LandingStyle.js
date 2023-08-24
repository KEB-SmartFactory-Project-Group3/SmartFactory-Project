import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

export const LandGrid = styled(Grid)`
  transition: ${({ transitionValue }) => transitionValue || "transform 0.3s, backdrop-filter 0.3s"};
  box-sizing: border-box;

  &:hover {
    backdrop-filter: ${({ backdropFilter }) => backdropFilter || "blur(15px)"};
    transform: ${({ transformValue }) => transformValue || "scale(1.05)"};
  }
`;


export const LandItem = styled.div`
  margin: 5px 0; // 각 그리드 마진 조정
  border: 1px solid white;
  box-shadow: none; 
  margin-top: 25px; 
  border-radius: 5px; 
  background: ${({ bg }) => bg || "rgba(255, 255, 255, 0.1)"};
  backdrop-filter: ${({ filter }) => filter || "blur(8px)"};
  color: white;
  transition: background 0.3s, backdrop-filter 0.3s, transform 0.3s;  // transform added for animation
  padding: 1rem;
  width: 100%;
  text-align: center; 
  cursor: pointer;
  overflow: hidden;
  box-sizing: border-box;

  &:hover {
    background: ${({ hoverBg }) => hoverBg || "rgba(255, 255, 255, 0.2)"};
    transform: ${({ scale }) => scale ? `scale(${scale})` : 'none'};  // animation effect added
  }
`;

// 예상 생산량, 예상 시간 item
export const PredictCountItem = styled.div`
margin: 5px 0; // 각 그리드 마진 조정
// border: ${props => props.highlight ? '2px solid #0f0' : '2px solid white'};

border: ${props => 
  props.highlight ? '2px solid #0f0' :
  props.highlightTime ? '2px solid #ffeb3b' : 
  '2px solid white'};
box-shadow: none; 
margin-top: 25px; 
border-radius: 5px; 
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(8px);
color: white;
transition: background 0.3s, backdrop-filter 0.3s;
padding: 1rem;
width: 100%;
height: 10vh;
text-align: center; 
cursor: pointer;
overflow: hidden;
box-sizing: border-box;

&:hover {
  background: rgba(255, 255, 255, 0.2);
}
`;

// 적정 온습도 item
export const TitrationItem = styled.div`
margin: 5px 0; // 각 그리드 마진 조정
border: 1px solid white;
box-shadow: none; 
margin-top: 25px; 
border-radius: 5px; 
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(8px);
color: white;
transition: background 0.3s, backdrop-filter 0.3s;
padding: 1rem;
width: 100%;
height: 10vh;
text-align: center; 
cursor: pointer;
overflow: hidden;
box-sizing: border-box;

&:hover {
  background: rgba(255, 255, 255, 0.2);
}
`;

export const LandDigitalClockStyle = styled(Typography)`
  font-family: 'Orbitron', sans-serif;
  // background-color: #333;
  color: #0f0;
  // padding: 0.4rem 5rem; //상하 0.4 좌우 5
  // border-radius: 5px;
  // border: 3px solid #0f0;
  // display: inline-block;
  // margin-bottom: 20px !important;
`;


