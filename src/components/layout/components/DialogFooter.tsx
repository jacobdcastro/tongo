import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { Dialog } from '../../../../@types/dialogs';
import { initSearch } from '../../../lib/searchBar';

const Footer = styled.div`
  position: relative;
  bottom: 0;
  width: 100%;
  margin: 0;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${props => props.theme.border};
  background-color: ${props => props.theme.bg};

  .clearBtn {
    font-size: 1.14rem;
    padding: 15px;
    border: none;
    font-weight: 600;
    background: none;
  }

  .applyBtn {
    background-color: ${props => props.theme.green};
    color: white;
    font-weight: 500;
    padding: 10px 45px;
    border: none;
    border-radius: 5px;
  }

  @media (min-width: 768px) {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

interface PropTypes {
  setActiveDialog?: Dispatch<SetStateAction<Dialog>>;
  toggleSearch?: Dispatch<SetStateAction<boolean>>;
  handleSubmit: () => void;
  handleCancel: () => void;
  isSearch?: boolean;
}

const DialogFooter = ({
  handleSubmit,
  handleCancel,
  isSearch,
}: PropTypes): JSX.Element => {
  return (
    <Footer>
      <button className="clearBtn" onClick={handleCancel}>
        {isSearch ? 'Cancel' : 'Clear'}
      </button>
      <button className="applyBtn" onClick={handleSubmit}>
        {isSearch ? 'Search' : 'Apply'}
      </button>
    </Footer>
  );
};

export default DialogFooter;
