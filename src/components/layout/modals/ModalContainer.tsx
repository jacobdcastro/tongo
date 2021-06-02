import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { Dialog } from '../../../@types/dialogs';
import CloseIcon from '@material-ui/icons/Close';
import ModalFooter from '../components/ModalFooter';
import { useWindowHeight } from 'window-dimensions-hooks';

interface ModalWrapperStyledProps {
  isActive: boolean;
  height: number;
}

const ModalWrapper = styled.div<ModalWrapperStyledProps>`
  height: ${props => props.height + 'px'};
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  .navModal {
    position: fixed;
    top: 150px;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.bg};
    z-index: 10;
    pointer-events: ${props => (props.isActive ? 'auto' : 'none')};
    /* height: 550px; */
    width: 90%;
    max-width: 400px;
    max-height: 445px;
    border-radius: 8px;
    transition: 500ms;
    background-color: ${props => props.theme.bg};

    header {
      position: relative;
      top: 0;
      width: 100%;
      margin: 0;
      padding: 15px 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top: 1px solid ${props => props.theme.border};
      border-bottom: 1px solid ${props => props.theme.border};

      h1 {
        text-align: center;
        width: 100%;
        font-weight: 800;
      }

      .closeBtn {
        background: none;
        border: none;
        &:hover {
          cursor: pointer;
        }

        .MuiSvgIcon-rootj {
          position: absolute;
          z-index: 6;
        }
      }
    }

    main {
      margin: 0 auto 65px;
      flex-grow: 1;
      padding: 10px;
      overflow-y: scroll;
    }
  }
`;

interface PropTypes {
  title: string;
  isActive: boolean;
  children: JSX.Element;
  setActiveDialog: Dispatch<SetStateAction<Dialog>>;
  handleSubmit: () => void;
  handleCancel: () => void;
  handleButtonChange?: (parent: string, child: string) => void;
  handleDistanceChange?: (distance: number) => void;
  toggleBrandFilter?: () => void;
}

const Content = ({
  title,
  children,
  setActiveDialog,
  handleSubmit,
  handleCancel,
}: PropTypes): JSX.Element => (
  <div className="navModal">
    <header>
      <button className="closeBtn" onClick={() => setActiveDialog(null)}>
        <CloseIcon />
      </button>
      <h1>{title.toUpperCase()}</h1>
    </header>
    <main>{children}</main>

    {title.toLowerCase() !== 'location' && (
      <ModalFooter
        setActiveDialog={setActiveDialog}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    )}
  </div>
);

// TODO if inactive, add 'hidden' attr
const ModalContainer = (props: PropTypes): JSX.Element => {
  const height = useWindowHeight();
  return (
    <ModalWrapper role="dialog" isActive={props.isActive} height={height}>
      <Content {...props} />
    </ModalWrapper>
  );
};

export default ModalContainer;
