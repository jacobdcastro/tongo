import { useState } from 'react';
import { UseRedeemOffer } from '../@types/hooks';

// TODO insert logic for tracking offers redeemed

const useRedeemOffer = (): UseRedeemOffer => {
  const [offerDialogIsOpen, toggleOfferDialog] = useState<boolean>(false);

  const initOfferRedemption = () => {
    // do stuff
    toggleOfferDialog(false);
  };

  return { offerDialogIsOpen, toggleOfferDialog };
};

export default useRedeemOffer;
