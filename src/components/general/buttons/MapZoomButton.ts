import styled from 'styled-components';

interface PropTypes {
  onClick: () => void;
}

const MapZoomButton = styled.button<PropTypes>`
  border: none;
  background-color: ${props => props.theme.bg};
  font-size: 1.5rem;
  color: ${props => props.theme.green};
  border-radius: 10px;
  margin: 5px 0;
  height: 50px;
  width: 50px;
`;

export default MapZoomButton;
