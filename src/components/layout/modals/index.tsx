import React, { Dispatch, SetStateAction } from 'react';
import { Dialog } from '../../../@types/dialogs';
import DateTimeModal from './DateTimeModal';

interface PropTypes {
  activeDialog: Dialog;
  setActiveDialog: Dispatch<SetStateAction<Dialog>>;
}

const AllModals = ({
  activeDialog,
  setActiveDialog,
}: PropTypes): JSX.Element => {
  return (
    <>
      <DateTimeModal
        activeDialog={activeDialog}
        setActiveDialog={setActiveDialog}
      />
    </>
  );
};

export default AllModals;
