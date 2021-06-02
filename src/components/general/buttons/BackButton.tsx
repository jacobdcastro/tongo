import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const BtnStyles = styled.button`
  position: absolute;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: 1px 2px 6px #444;
  top: 22px;
  left: 22px;
  z-index: 3;
  background-color: ${props => props.theme.bg};
`;

interface BackButtonPropTypes {
  backupUrl?: string;
}

const BackButton = ({ backupUrl }: BackButtonPropTypes): JSX.Element => {
  const router = useRouter();

  const initGoBack = () => {
    if (typeof window !== 'undefined') router.back();
  };

  return (
    <BtnStyles aria-roledescription="go to back page">
      <ArrowBackIcon onClick={initGoBack} />
    </BtnStyles>
  );
};

export default BackButton;
