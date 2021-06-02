import React from 'react';
import styled from 'styled-components';
import HTag from './HTag';
import { HeadingPropTypes } from '../../../@types/general';

const SubHead = styled.span`
  .text {
    color: ${props => props.theme.hText};
    font-weight: 600;
    font-size: 1.2rem;
  }
`;

const PageHeading = ({
  headerType,
  children,
  uppercase,
  className,
}: HeadingPropTypes): JSX.Element => {
  return (
    <SubHead>
      <HTag
        className={`text${className ? ' ' + className : ''}`}
        type={headerType}
      >
        {uppercase ? children.toUpperCase() : children}
      </HTag>
    </SubHead>
  );
};

export default PageHeading;
