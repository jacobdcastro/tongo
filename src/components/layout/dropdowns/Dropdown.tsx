import React from 'react';
import styled from 'styled-components';

interface ContainerProps {
  isActive: boolean;
}

const DropdownContainer = styled.div<ContainerProps>`
  position: fixed;
  top: ${props => (props.isActive ? '80px' : '-200px')};
  z-index: 4;
  background-color: ${props => props.theme.bg};
  border-radius: 0 0 15px 15px;
  box-shadow: 1px 5px 14px #656565;
  margin: auto;
`;

interface PropTypes {
  children: JSX.Element;
  isActive: boolean;
}

const Dropdown = ({ children }: PropTypes): JSX.Element => {
  return (
    <DropdownContainer>
      {children}
      <div></div>
    </DropdownContainer>
  );
};

export default Dropdown;
