import styled from 'styled-components';
import Grid from '@mui/material/Grid';

export const VisionGridStyled = styled(Grid)`
  // 기본 스타일
  box-sizing: border-box;
`;

export const VisionItemStyled = styled.div`
  margin: 5px 0; // 각 그리드 마진 조정
  // border: 1px solid white;
  box-shadow: none; 
  margin-top: 25px; 
  border-radius: 5px; 
  // background: rgba(255, 255, 255, 0.1);
  // backdrop-filter: blur(8px);
  color: white;
  transition: background 0.3s, backdrop-filter 0.3s;
  padding: 1rem;
  width: 100%;
  height: auto;
  text-align: center; 
  cursor: pointer;
  overflow: hidden;
  box-sizing: border-box;
`;