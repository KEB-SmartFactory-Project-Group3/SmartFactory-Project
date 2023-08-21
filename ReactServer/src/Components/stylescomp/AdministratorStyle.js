import styled from 'styled-components';
import Grid from '@mui/material/Grid';

// export const AdminItemStyled = styled.div`
//   position: relative;
//   margin: 5px 0; // 각 그리드 마진 조정
//   box-shadow: none; 
//   margin-top: 25px; 
//   border-radius: 5px; 
//   color: white;
//   padding: 1rem;
//   width: 100%;
//   // height: 22vh;
//   text-align: center; 
//   overflow: hidden;
//   box-sizing: border-box;
// `;


export const AdminItemStyled = styled.div`
  display: grid;
  height: 90%;
  width: 90%;
  border-radius: 2rem;
  border: 1px solid white;
  margin: auto;
`;

export const AdminStyledFactor = styled.div`
  display : grid;
  height: 95vh;
  width: 95vw;
  border-radius: 2rem;
  border: 1px solid white;
  background: blue;
  place-items: center;
  `; 