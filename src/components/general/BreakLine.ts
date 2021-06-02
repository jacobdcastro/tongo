import styled from 'styled-components';

const BreakLine = styled.span`
  content: '';
  display: block;
  height: 2px;
  width: 100%;
  border-radius: 30%;
  background-color: ${props => props.theme.border};
`;

export default BreakLine;
