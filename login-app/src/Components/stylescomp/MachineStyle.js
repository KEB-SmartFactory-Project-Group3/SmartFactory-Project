import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';

export const ModalStyled = styled.div`
 //중앙배치
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  position: absolute;
  width: 600px;
  padding: 16px;
  outline: none;

  &:hover {
   
  }

  transition: opacity 0.5s ease, transform 0.5s ease;

  &.open {
    opacity: ${props => props.isOpen ? 1 : 0};
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const GridItemStyled = styled(Grid)`
  // 기본 스타일
  transition: transform 0.3s, backdrop-filter 0.3s;

  &:hover {
    backdrop-filter: blur(15px);
    transform: scale(1.05);
  }

`;

export const ItemStyled = styled.div`
  margin: 8px 0; // 각 그리드 마진 조정
  border: 1px solid white;
  box-shadow: none; 
  margin-top: 30px; 
  // margin-left: 10px;
  // margin-right: 10px;
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

export const SubmitContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const StyledTextField = styled(TextField)`
  & .MuiInputLabel-root {
    color: white;
  }

  & .MuiInputBase-root {
    color: white;

    & fieldset {
      border-color: white;
    }
  }

  & .MuiFormHelperText-root {
    color: white;
  }
`;
