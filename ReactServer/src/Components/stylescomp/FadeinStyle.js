import styled, { keyframes, css } from 'styled-components';
import { Box } from '@mui/material';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const FadeBox = styled(Box)`
  opacity: 0;
  &.fade-enter,
  &.fade-appear {
    opacity: 0;
  }
  &.fade-enter-active,
  &.fade-appear-active {
    animation: ${fadeIn} 2.3s forwards;
  }
  &.fade-enter-done,
  &.fade-appear-done {
    opacity: 1;
  }
`;
