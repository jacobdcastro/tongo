import React, { useState } from 'react';
import styled from 'styled-components';
import { Dialog } from '../../../@types/dialogs';
import SearchBarDialog from '../dialogs/SearchDialog';
import UpperHeader from './UpperHeader';
import LowerHeader from './LowerHeader';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 10;
  width: 100%;
  height: 127px;
  padding: 4px 10px 10px;
  box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.2);
  z-index: 4;
  background-color: ${props => props.theme.bg};

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;
    height: 88px;
  }
`;

interface PropTypes {
  setActiveDialog: React.Dispatch<React.SetStateAction<Dialog>>;
}

const Header = ({ setActiveDialog }: PropTypes): JSX.Element => {
  const [searchIsActive, toggleSearch] = useState<boolean>(false);
  return (
    <>
      <UpperHeader
        searchIsActive={searchIsActive}
        toggleSearch={toggleSearch}
      />
      <LowerHeader setActiveDialog={setActiveDialog} />
      <HeaderContainer />
      <SearchBarDialog isActive={searchIsActive} toggleSearch={toggleSearch} />
    </>
  );
};

export default Header;
