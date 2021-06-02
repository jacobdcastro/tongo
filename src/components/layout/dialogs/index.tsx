import React, { Dispatch, SetStateAction, useEffect } from 'react';
import DateTimeDialog from './DateTimeDialog';
// import LocationDialog from './LocationDialog';
import FiltersDialog from './FiltersDialog';
import { Dialog } from '../../../@types/dialogs';
import useDisableScroll from '../../../hooks/useDisableScroll';
import { useWindowWidth } from 'window-dimensions-hooks';

interface PropTypes {
  activeDialog: Dialog;
  setActiveDialog: Dispatch<SetStateAction<Dialog>>;
}

const Dialogs = ({ activeDialog, setActiveDialog }: PropTypes): JSX.Element => {
  const disableScroll = useDisableScroll();
  const width = useWindowWidth();

  useEffect(() => {
    if (width <= 768) {
      disableScroll(
        activeDialog === 'datetime' ||
          activeDialog === 'filter' ||
          activeDialog === 'location' ||
          activeDialog === 'search' ||
          activeDialog === 'timeOfDay'
      );
    }
  }, [disableScroll, activeDialog, width]);

  return (
    <>
      <DateTimeDialog
        activeDialog={activeDialog}
        setActiveDialog={setActiveDialog}
      />
      {/* <LocationDialog
        activeDialog={activeDialog}
        setActiveDialog={setActiveDialog}
      /> */}
      {/* <FiltersDialog
        activeDialog={activeDialog}
        setActiveDialog={setActiveDialog}
      /> */}
    </>
  );
};

export default Dialogs;
