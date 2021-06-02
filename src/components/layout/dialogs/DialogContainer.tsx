import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { Dialog } from '../../../@types/dialogs';
import CloseIcon from '@material-ui/icons/Close';
import DialogFooter from '../components/DialogFooter';
import { useWindowHeight } from 'window-dimensions-hooks';

interface DialogWrapperStyledProps {
  height: number;
  isActive: boolean;
  type: 'datetime' | 'location';
}

const DialogWrapper = styled.div<DialogWrapperStyledProps>`
  position: fixed;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.bg};
  z-index: 10;
  bottom: ${props => (props.isActive ? '0' : '-125vh')};
  pointer-events: ${props => (props.isActive ? 'auto' : 'none')};
  height: ${props => `${props.height}px`};
  width: 100%;
  margin: 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  transition: 500ms;

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
    flex-grow: 1;
    padding: 10px;
  }

  @media (min-width: 768px) {
    border-radius: 10px;
    height: ${props => (props.type === 'datetime' ? '410px' : '680px')};
    width: ${props => (props.type === 'datetime' ? '575px' : '350px')};
    top: ${props => (props.isActive ? '80px' : '-80px')};
    opacity: ${props => (props.isActive ? '1' : '0')};
    left: 400px;
    box-shadow: 3px 10px 15px rgba(0, 0, 0, 0.5);
  }
`;

interface PropTypes {
  title: string;
  isActive: boolean;
  children: JSX.Element;
  setActiveDialog: Dispatch<SetStateAction<Dialog>>;
  handleSubmit: () => void;
  handleCancel: () => void;
  type: 'datetime' | 'location';
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
  type,
}: PropTypes): JSX.Element => (
  <>
    <header>
      <button className="closeBtn" onClick={() => setActiveDialog(null)}>
        <CloseIcon />
      </button>
      <h1>{title.toUpperCase()}</h1>
    </header>

    <main>{children}</main>

    {title.toLowerCase() !== 'location' && (
      <DialogFooter
        setActiveDialog={setActiveDialog}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    )}
  </>
);

// TODO if inactive, add 'hidden' attr
const DialogContainer = (props: PropTypes): JSX.Element => {
  const height = useWindowHeight();
  return (
    <DialogWrapper
      role="dialog"
      isActive={props.isActive}
      height={height}
      type={props.type}
    >
      <Content {...props} />
    </DialogWrapper>
  );
};

export default DialogContainer;
