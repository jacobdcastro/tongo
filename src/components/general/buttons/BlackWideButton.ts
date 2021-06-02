import styled from 'styled-components';

interface PropTypes {
  onClick: () => void;
  uppercase?: boolean;
}

const BlackWideButton = styled.button<PropTypes>`
  width: 100%;
  border: 1px solid ${props => props.theme.fg};
  border-radius: 10px;
  height: 50px;
  background-color: transparent;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'none')};
`;

export default BlackWideButton;
