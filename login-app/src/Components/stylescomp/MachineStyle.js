import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import { Card, CardContent, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Dialog } from '@mui/material';


export const ModalStyled = styled.div`
 //중앙배치
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  position: absolute;
  // width: 600px;
  width: 100%; // 모바일 환경의 기본 값
  padding: 16px;
  outline: none;

  @media (min-width: 600px) {
    width: 600px; // 600px 이상의 화면에서는 600px로 고정
  }

  transition: opacity 0.5s ease, transform 0.5s ease;

  &.open {
    opacity: ${props => props.isOpen ? 1 : 0};
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const GridItemStyled = styled(Grid)`
  // 기본 스타일
  // transition: background 0.3s, backdrop-filter 0.3s;
  box-sizing: border-box;

  // &:hover {
  //   backdrop-filter: blur(15px);
  //   transform: scale(1.05);
  // }
`;

export const ItemStyled = styled.div`
  margin: 5px 0; // 각 그리드 마진 조정
  border: 1px solid white;
  box-shadow: none; 
  margin-top: 25px; 
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
// 도달량, 목표생산량
export const ItemStyledCount = styled.div`
  position: relative;
  margin: 5px 0; // 각 그리드 마진 조정
  border: 2px solid ${props => props.borderColor || 'white'};
  box-shadow: none; 
  margin-top: 25px; 
  border-radius: 5px; 
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  color: white;
  transition: background 0.3s, backdrop-filter 0.3s;
  padding: 1rem;
  width: 100%;
  height: ${props => props.height || '23vh'};
  text-align: center; 
  cursor: pointer;
  overflow: hidden;
  // overflow: visible;
  box-sizing: border-box;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

// 목표생산량, 생산관리DB
export const ItemCountDB = styled.div`
  position: relative;
  margin: 5px 0; // 각 그리드 마진 조정
  border: 2px solid ${props => props.borderColor || 'white'};
  box-shadow: none; 
  margin-top: 25px; 
  border-radius: 5px; 
  background: ${props => props.background || 'rgba(255, 255, 255, 0.1)'};
  backdrop-filter: ${props => props.backdropFilter || 'blur(8px)'};
  color: white;
  transition: background 0.3s, backdrop-filter 0.3s;
  padding: 1rem;
  width: 100%;
  height: ${props => props.height || '10vh'};
  text-align: center; 
  cursor: pointer;
  overflow: hidden;
  // overflow: visible;
  box-sizing: border-box;

  &:hover {
    background: ${props => props.hoverBackground || 'rgba(255, 255, 255, 0.2)'};
  }
`;
// 도달률 라벨
export const RateLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
  padding-left: 1rem;
`;

// 차트 부분
export const GridItemStyledChart = styled(Grid)`
  // 기본 스타일
  transition: transform 0.3s, backdrop-filter 0.3s;
  box-sizing: border-box;
 
`;
export const ItemStyledChart = styled.div`
  margin: 2px 0;
  border: 2px solid white;
  box-shadow: none; 
  margin-top: 25px; 
  border-radius: 5px; 
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  color: white;
  transition: background 0.3s, backdrop-filter 0.3s;
  padding: 0.5rem;
  width: 100%;
  height: 100%;

  //내부의 모든 자식요소를 가운데 정렬
  display: flex;
  align-items: center; 
  justify-content: center;

  text-align: center; 
  cursor: pointer;
  overflow: hidden;
  box-sizing: border-box;
`;

// 현재생산량 
export const ProductionItemStyled = styled.div`
  position: relative;
  margin: 5px 0; // 각 그리드 마진 조정
  border: 2px solid ${props => props.borderColor || 'white'};
  box-shadow: none; 
  margin-top: 25px; 
  border-radius: 5px; 
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  color: white;
  transition: background 0.3s, backdrop-filter 0.3s;
  padding: 1rem;
  width: 100%;
  height: ${props => props.height || 'auto'};
  text-align: center; 
  cursor: pointer;
  overflow: hidden;
  // overflow: visible;
  box-sizing: border-box;
  display: flex;           
  align-items: center;    
  justify-content: center; 
  flex-direction: column;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;
export const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  position: absolute; 
  top: 18px; 
  left: 150px; 

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

// 가동 시간 디자인
export const GridItemStyledTime = styled(Grid)`
  // 기본 스타일
  transition: transform 0.3s, backdrop-filter 0.3s;
  box-sizing: border-box;

  &:hover {
    backdrop-filter: blur(15px);
    transform: scale(1.05);
  }
`;
export const DigitalClockStyle = styled(Typography)`
  font-family: 'Orbitron', sans-serif;
  background-color: #333;
  color: #0f0;
  padding: 1rem 5rem; //상하 0.4 좌우 5
  border-radius: 5px;
  border: 3px solid #0f0;
  display: inline-block;
  margin-bottom: 20px !important;
`;

export const ItemStyledTime = styled.div`
  margin: 1px 0; // 각 그리드 마진 조정
  box-shadow: none; 
  margin-top: 25px; 
  border: 2px solid ${props => props.borderColor || 'none'};
  border-radius: 5px; 
  color: white;
  padding: 0rem; //상하 0
  width: 100%;
  height: ${props => props.height || 'auto'};
  text-align: center; 
  cursor: pointer;
  overflow: hidden;
  box-sizing: border-box;
`;

// 버튼 디자인

export const SubmitButtonStyled = styled(Button)`
  font-family: 'Orbitron', sans-serif !important;
  margin: 0 7px !important;
  
  &:hover {
    background-color: #555 !important;
  }
`;
export const ButtonStyled = styled(Button)`
  font-family: 'Orbitron', sans-serif !important;
 
  // border-color: white !important;
  margin-top: 20px !important;
  width: 150px !important;
  height: 50px !important;
  margin: 0 7px !important;
  border-width: ${props => props.borderWidth || '1px'} !important; 
  
  &:hover {
    background-color: ${props => props.hoverColor || '#555'} !important;
  }
`;


export const GridContainerStyled = styled(Grid)`
  align-items: center; 
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
`;

// reset dialog style
export const StyledDialog = styled(Dialog)`
  & .MuiPaper-root {
    // background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 5px;
    border: 1px solid white;
    color: white;
  }
`;


export const StyledCancelButton = styled(Button)`
  background-color: white; // 배경색 흰색
  color: black; // 글자색 검정

  &:hover {
    background-color: #f2f2f2;
  }
`;

export const StyledResetButton = styled(Button)`
  background-color: white; // 배경색 흰색
  color: red; // 글자색 빨간색

  &:hover {
    background-color: #f2f2f2;
  }
`;