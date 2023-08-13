import styled from 'styled-components';

export const StyledMachineLanding = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledMachinePage = styled.div`
  display : grid;
  height: 97%;
  width: 97%;
  border-radius: 2rem;
  background-color: #C0C0C0;
  overflow: hidden;
  // gird-template-columns: 11rem auto;
`;

const StyledButton = styled(Button)`
  //공통 스타일
  border: 1px solid #8E24AA;
  border-radius: 5px;
  box-shadow: none;
  padding: 10px 20px;
  font-weight: bold;
  
  //가동 시작버튼에만 적용되는 스타일 
  &.start-button {
    color: red;
  일

  //reset 버튼에만 적용되는 스타일
  &.reset-button {
    background-color: #5C6AC4;
    color: white;
  }
`;
