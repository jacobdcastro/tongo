import React from 'react';
import styled from 'styled-components';

const Foot = styled.footer`
  text-align: center;
`;

const Footer = (): JSX.Element => {
  return <Foot>&copy; {new Date().getFullYear()} - Tongo</Foot>;
};

export default Footer;
