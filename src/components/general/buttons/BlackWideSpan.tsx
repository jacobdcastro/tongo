import styled from 'styled-components';

interface PropTypes {
  uppercase?: boolean;
}

const BlackWideSpan = styled.span<PropTypes>`
  width: 100%;
  border: 1px solid ${props => props.theme.fg};
  border-radius: 10px;
  height: 50px;
  background-color: transparent;
  font-weight: 500;
  font-size: 1.05rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'none')};
  color: ${props => props.theme.fg};

  @media (min-width: 768px) {
    width: 250px;
    float: right;
    align-self: flex-end;
  }
`;

export default BlackWideSpan;
