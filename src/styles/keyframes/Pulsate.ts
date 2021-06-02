import { keyframes } from 'styled-components';

const pulsate = keyframes`
  0% {
    background-color: #999999;
  }
  50% {
    background-color: #cccccc;
  }
  100% {
    background-color: #999999;
  }
`;

export default pulsate;
