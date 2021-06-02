import { Dispatch, SetStateAction } from 'react';

export interface UseRedeemOffer {
  offerDialogIsOpen: boolean;
  toggleOfferDialog: Dispatch<SetStateAction<boolean>>;
}
