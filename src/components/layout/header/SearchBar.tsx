import React, { useContext } from 'react';
import styled from 'styled-components';
import { SearchBarContext } from '../components/Context/SearchBarContext';
import { useSelector } from 'react-redux';
import { RootState } from '../../../@types/redux';

interface InputProps {
  isActive: boolean;
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputDiv = styled.div<InputProps>`
  background-color: ${props => props.theme.bg};
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  flex-direction: row;
  height: 50px;
  transition: 750ms;
  width: ${props => (props.isActive ? '100%' : 'calc(100% - 45px)')};
  margin-left: 20px;
  font-size: 0.9rem;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 2px 4px 6px #ddd;
  z-index: 6;
  float: right;
  .iconBtn {
    background-color: transparent;
    border: none;
    position: relative;
    width: 25px;
    height: 25px;
    padding: 0;
    outline: none;

    img {
      top: 5px;
      left: 0;
      position: absolute;
      height: 20px;
      width: auto;
      margin-right: 5px;
      transition: 350ms;
    }
    .searchIcon {
      opacity: ${props => (props.isActive ? '0' : '1')};
    }
    .backIcon {
      opacity: ${props => (props.isActive ? '1' : '0')};
    }
  }

  /* TEMPORARY */
  .buttonOverlay {
    position: absolute;
    z-index: 9;
    width: ${props =>
      props.isActive ? 'calc(100% - 25px)' : 'calc(100% - 15px)'};
    height: 35px;
    background-color: transparent;
    border: none;
    outline: none;
  }

  input {
    border: none;
    width: 100%;
  }
  input:disabled {
    background-color: ${props => props.theme.bg};
  }

  @media (min-width: 768px) {
    width: 310px;
    float: left;
    left: 20px;
  }
`;

interface PropTypes {
  text: string;
  isActive: boolean;
  toggleSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar = ({
  text,
  isActive,
  toggleSearch,
}: PropTypes): JSX.Element => {
  const { value, setValue } = useContext(SearchBarContext);
  const search = useSelector((state: RootState) => state.search);

  const handleClick = () => {
    if (!isActive) toggleSearch(!isActive);
  };

  const handleChange = e => {
    if (isActive) setValue(e.target.value);
  };

  return (
    <InputDiv isActive={isActive} onClick={handleClick}>
      <button
        className="iconBtn"
        onClick={() => toggleSearch(isActive ? false : true)}
      >
        <img
          className="searchIcon"
          src="/assets/search-24px.svg"
          alt="search"
        />
        <img
          className="backIcon"
          src="/assets/icons/chevron-left.svg"
          alt="back"
        />
      </button>
      <button
        className="buttonOverlay"
        onClick={() => toggleSearch(isActive ? false : true)}
      />
      <input
        type="text"
        placeholder={text}
        value={search ? search.name : value}
        onChange={handleChange}
        disabled // !! TEMPORARY DISABLE !!
      />
    </InputDiv>
  );
};

export default SearchBar;
