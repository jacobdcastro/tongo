import React from 'react';
import styled from 'styled-components';
import HTag from './HTag';
import { HeadingPropTypes } from '../../../@types/general';

interface SubHeadProps {
  height: number;
  width: number;
}

const SubHead = styled.span<SubHeadProps>`
  display: flex;
  flex-direction: row;
  align-items: center;

  .icon {
    margin-right: 12px;
    height: ${props => (props.height ? props.height + 'px' : '24px')};
    width: ${props => (props.width ? props.width + 'px' : 'auto')};
  }

  .text {
    color: ${props => props.theme.green};
    font-weight: 600;
    font-size: 1.05rem;
    white-space: nowrap;
  }
`;

const GreenHeading = ({
  headerType,
  children,
  iconFilename,
  iconFilepath,
  iconAlt,
  uppercase,
  className,
  iconDimensions,
}: HeadingPropTypes): JSX.Element => (
  <SubHead
    height={iconDimensions && iconDimensions.height}
    width={iconDimensions && iconDimensions.width}
  >
    {iconFilename && (
      <img
        className="icon"
        src={`/assets/icons/${iconFilename}`}
        alt={iconAlt}
      />
    )}
    {iconFilepath && <img className="icon" src={iconFilepath} alt={iconAlt} />}
    <HTag
      className={`text${className ? ' ' + className : ''}`}
      type={headerType}
    >
      {uppercase ? children.toUpperCase() : children}
    </HTag>
  </SubHead>
);

export default GreenHeading;
