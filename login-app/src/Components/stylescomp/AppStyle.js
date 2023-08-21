import styled  ,{ keyframes }from 'styled-components';


const colorAnimation = keyframes`
  0% {
    background-position: 0 50%;
  }
  25% {
    background-position: 25% 50%;
  }
  50% {
    background-position: 50% 50%;
  }
  75% {
    background-position: 75% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;

export const StyledDiv = styled.div`
  background: linear-gradient(45deg, #000000, #212121);
  background-size: 300% 300%;
  animation:  ${colorAnimation} 12s ease-in-out infinite;

  background-position: center;
  overflow: hidden;
`;