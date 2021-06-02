import React, { useContext } from 'react';
import styled from 'styled-components';
import { DisableScrollContext } from './components/Context/DisableScrollContext';

interface PageWrapperProps {
  scrollIsDisabled?: boolean;
}

const PageWrapperDiv = styled.div<PageWrapperProps>`
  position: ${props => (props.scrollIsDisabled ? 'fixed' : 'static')};
  overflow-y: ${props => (props.scrollIsDisabled ? 'scroll' : 'auto')};
  ${props => props.scrollIsDisabled && 'top: 0;'};
  overflow-x: hidden;
`;

export default PageWrapperDiv;
