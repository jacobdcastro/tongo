import axios from 'axios';
import { XanoOffer, XanoOfferRedemption } from '../@types/apiTypes/offer';

export const getOfferById = async (id: number) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `https://x608-3b7f-b1ce.n7.xano.io/api:704ee1/offer/${id}`,
    });
    return res.data;
  } catch (error) {
    console.error('FUNCTION: getOfferById()', error.response);
  }
};

// used by server-side function /api/redeem-offer
export const redeemOffer = async (offerId: number, brand_id: number) => {
  const redemptionObj: XanoOfferRedemption = {
    brand_id,
    used_at: Date.now(),
  };

  try {
    const offerData = await getOfferById(offerId);
    const offer: XanoOffer = offerData;
    offer.redemptions.unshift(redemptionObj);
    await axios({
      method: 'POST',
      url: `https://x608-3b7f-b1ce.n7.xano.io/api:704ee1/offer/${offerId}`,
      data: offer,
    });
    return redemptionObj;
  } catch (error) {
    console.error('FUNCTION: redeemOffer()', error);
  }
};
