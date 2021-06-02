import styled from 'styled-components';

interface SVGIconButtonPropTypes {
  onClick: () => unknown;
}

const SVGIconButton = styled.button<SVGIconButtonPropTypes>`
  padding: 0;
  margin: 5px;
  border: none;
  background: none;
  height: 25px;
  width: 25px;

  .icon {
    height: 100%;
    width: auto;
  }

  /* enlarge save icon */
  .save {
    transform: scale(1.28);
  }
`;

export default SVGIconButton;
