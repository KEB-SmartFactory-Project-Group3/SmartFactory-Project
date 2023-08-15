import styled from 'styled-components';
import Grid from '@mui/material/Grid';


//기본 그리드 스타일
export const LandGrid = styled(Grid)`
  transition: transform 0.3s, backdrop-filter 0.3s;
  box-sizing: border-box;

  &:hover {
    backdrop-filter: blur(15px);
    transform: scale(1.05);
  }
`;

//기본 item 
export const LandItem = styled.div`
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
  text-align: center; 
  cursor: pointer;
  overflow: hidden;
  box-sizing: border-box;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

// 예상 생산량, 예상 시간 item
export const PredictCountItem = styled.div`
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


