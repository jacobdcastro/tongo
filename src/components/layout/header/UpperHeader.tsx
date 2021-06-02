import React from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import Link from 'next/link';
import { Dialog } from '../../../@types/dialogs';

interface HeaderStylesProps {
  searchIsActive: boolean;
}

const Upper = styled.div<HeaderStylesProps>`
  height: 50px;
  position: fixed;
  width: calc(100% - 30px);
  margin: 15px;
  z-index: 8;

  #tongoLogo {
    position: relative;
    transition: 750ms;
    opacity: ${props => (props.searchIsActive ? 0 : 1)};
    right: ${props => (props.searchIsActive ? '35px' : 0)};
    padding: 10px 0;
    float: left;
  }
`;

interface PropTypes {
  searchIsActive: boolean;
  toggleSearch: React.Dispatch<React.SetStateAction<Dialog>>;
}

const UpperHeader = ({
  searchIsActive,
  toggleSearch,
}: PropTypes): JSX.Element => {
  return (
    <Upper searchIsActive={searchIsActive}>
      <Link href="/">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>
          <img
            id="tongoLogo"
            src="/logo-green-minimal.svg"
            alt="tongo logo"
            title="Tongo"
          />
        </a>
      </Link>
      <SearchBar
        isActive={searchIsActive}
        toggleSearch={toggleSearch}
        text="What are you in the mood for?"
      />
    </Upper>
  );
};

export default UpperHeader;
