import React from 'react';
import { CircularProgress } from '@material-ui/core';
import styled from 'styled-components';

interface LoaderContainerProps {
  isFullPage: boolean;
}

const LoaderContainer = styled.div<LoaderContainerProps>`
  height: ${props => (props.isFullPage ? '100vh' : '235px')};
  width: 100%;
  margin-bottom: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface PropTypes {
  isFullPage?: boolean;
}

const Loader = ({ isFullPage }: PropTypes): JSX.Element => {
  return (
    <LoaderContainer isFullPage={isFullPage}>
      <CircularProgress />
    </LoaderContainer>
  );
};

export default Loader;
