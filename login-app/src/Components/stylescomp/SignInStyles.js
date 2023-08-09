import styled from 'styled-components';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export const StyledSignInContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: radial-gradient(
    circle,
    rgba(199,174,238,0.2606516290726817) 0%, 
    rgba(84,92,192,0.5463659147869675) 48%
  );
  min-height: 100vh;

  @media (max-width: 768px) {
    /* 화면 크기가 768px 이하일 때 배경색 변경 */
    background: radial-gradient(
      circle,
      rgba(255, 0, 0, 0.3) 0%, 
      rgba(0, 0, 255, 0.5) 48%
    );
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
  background-color: rgba(255, 255, 255, 0.3);
  padding: 30px;
  border-radius: 15px;
  width: 350px;
  height: 275px;
  margin-top: 200px; 

  @media (max-width: 768px) {
    /* 화면 크기가 768px 이하일 때 Box의 스타일 변경 */
    width: auto; 
    height: auto;
  }
`;