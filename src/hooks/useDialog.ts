import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { Dialog } from '../@types/dialogs';

// TODO to be implemented later

interface DialogStateTypes {
  isOpen: boolean;
  isOpening: boolean;
  isClosed: boolean;
  isClosing: boolean;
}

interface DialogReturnTypes {
  setState: Dispatch<SetStateAction<DialogStateTypes>>;
  state: DialogStateTypes;
}

const useDialog = (
  activeDialog: Dialog,
  setActiveDialog: Dispatch<SetStateAction<Dialog>>,
  dialogType: Dialog
): DialogReturnTypes => {
  const [isActive, toggleActive] = useState(false);

  useEffect(() => {
    if (activeDialog === dialogType) toggleActive(true);
    else toggleActive(false);
  }, [activeDialog]);

  return { isActive };
};

export default useDialog;
