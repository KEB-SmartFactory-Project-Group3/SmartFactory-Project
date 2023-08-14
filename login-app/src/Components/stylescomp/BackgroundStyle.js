import styled  from 'styled-components';

export const StyledBackground = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  overflow-x:hidden;
`;

export const StyledFactor = styled.div`
  display : grid;
  height: 97vh;
  width: 97vw;
  border-radius: 2rem;
  // border: 1px solid white;

  // 큰 화면일 때 스크롤바 숨김
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  
  scrollbar-width: none;

  overflow: auto;
  overflow-x: hidden;
  // gird-template-columns: 11rem auto;

  @media (max-width: 768px) {
    ::-webkit-scrollbar {
      display: block;
    }
    -ms-overflow-style: scrollbar; 
    scrollbar-width: auto; 
  }
`;
