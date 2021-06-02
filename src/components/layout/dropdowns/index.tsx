import React, { Dispatch, SetStateAction } from 'react';
import DateTimeDropdown from './DateTimeDropdown';
// import LocationDialog from './LocationDialog';
// import FiltersDialog from './FiltersDialog';
import { Dialog } from '../../../@types/dialogs';

interface PropTypes {
  activeDialog: Dialog;
  setActiveDialog: Dispatch<SetStateAction<Dialog>>;
}

const AllDropdowns = ({
  activeDialog,
  setActiveDialog,
}: PropTypes): JSX.Element => {
  return (
    <>
      {/* <DateTimeDropdown
        activeDialog={activeDialog}
        setActiveDialog={setActiveDialog}
      /> */}
      {/* <LocationDialog
        activeDialog={activeDialog}
        setActiveDialog={setActiveDialog}
      />
      <FiltersDialog
        activeDialog={activeDialog}
        setActiveDialog={setActiveDialog}
      /> */}
    </>
  );
};

export default AllDropdowns;
