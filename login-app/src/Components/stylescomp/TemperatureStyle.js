import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import { Card, CardContent, Typography } from '@mui/material';
import Button from '@mui/material/Button';

export const TempGridStyled = styled(Grid)`
  // 기본 스타일
  box-sizing: border-box;

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
  height: 22vh;
  text-align: center; 
  cursor: pointer;
  overflow: hidden;
  box-sizing: border-box;
  overflow: hidden;
`;

// 온슫도 item
export const TempHumItemStyled = styled.div`
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
  height: 11vh;

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
