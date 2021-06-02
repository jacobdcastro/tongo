import React from 'react';
import styled from 'styled-components';

const Mark = styled.div`
  display: flex;
  flex-direction: column;
  small {
    margin-top: 3px;
    font-size: 0.532rem;
    color: ${props => props.theme.subHText};
  }
`;

interface PropTypes {
  label: string;
  alt: string;
  iconFilename: string;
}

const SliderMark = ({ label, alt, iconFilename }: PropTypes): JSX.Element => {
  return (
    <Mark>
      <img src={`assets/icons/${iconFilename}`} alt={alt} />
      <small dangerouslySetInnerHTML={{ __html: label.toUpperCase() }} />
    </Mark>
  );
};

export default SliderMark;
