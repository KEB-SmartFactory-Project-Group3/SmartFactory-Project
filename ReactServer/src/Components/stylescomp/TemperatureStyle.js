import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import { Card, CardContent, Typography } from '@mui/material';
import Button from '@mui/material/Button';

export const TempGridStyled = styled(Grid)`
  // 기본 스타일
  box-sizing: border-box;
  // 정렬
  display: flex; 
  justify-content: "center"; 
  align-items: "center"; 
`;

export const TempItemStyled = styled.div`
  position: relative;
  margin: 5px 0; // 각 그리드 마진 조정
  border: 2px solid ${props => props.borderColor || 'white'};
  box-shadow: none; 
  margin-top: 25px; 
  border-radius: 5px; 
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  color: white;
  padding: 1rem;
  width: 100%;
  height: auto;
  text-align: center; 
  cursor: pointer;
  overflow: hidden;
  // 자식 요소 중앙 정렬
  display: flex; 
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
`;

// 온슫도 item
export const TempHumItemStyled = styled.div`
  position: relative;
  margin: 5px 0; // 각 그리드 마진 조정
  box-shadow: none; 
  margin-top: 25px;
  border: 2px solid white;
  border-radius: 5px;  

  // background: rgba(255, 255, 255, 1);
  // backdrop-filter: blur(8px);
  color: white;
  padding: 1rem;
  width: 90%;
  height: 16vh;

  //내부의 모든 자식요소를 가운데 정렬
  display: flex;
  align-items: center; 
  justify-content: center;

  text-align: center;
  cursor: pointer;
  overflow: hidden;
  box-sizing: border-box;
  overflow: hidden;
`;

// 온습도 DB
export const TempHumDBStyled = styled.div`
  position: relative;
  margin: 2px 0; // 각 그리드 마진 조정
  box-shadow: none; 
  margin-top: 5px;
  // border: 2px solid white;
  border-radius: 5px;  
  // color: white;
  padding: 0rem;
  width: 100%;
  height: 525px;

  //내부의 모든 자식요소를 가운데 정렬
  display: flex;
  align-items: center; 
  justify-content: center;

  text-align: center;
  cursor: pointer;
  overflow: hidden;
  box-sizing: border-box;
  overflow: hidden;
`;
// 온습도 실시간 그래프 item
export const TempChartItemStyled = styled.div`
  position: relative;
  margin: 5px 0; // 각 그리드 마진 조정
  flex: 1;
  box-shadow: none; 
  margin-top: 25px;
  border: 2px solid ${props => props.borderColor || 'white'};
  border-radius: 5px; 
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  color: white;
  padding: 0.5rem;
  width: 100%;
  height: ${props => props.height || 'auto'};

  //내부의 모든 자식요소를 가운데 정렬
  display: flex;
  align-items: center; 
  justify-content: center;

  text-align: center;
  cursor: pointer;
  overflow: hidden;
  box-sizing: border-box;
`;
