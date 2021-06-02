import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { redeemOffer } from '../../lib/offers';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const redemptionObj = await redeemOffer(req.body.offerId, req.body.brandId);
    res.status(200);
    res.send(redemptionObj);
  } catch (error) {
    res.status(500);
    res.send(error.response);
    console.error('SERVERLESS FUNCTION: api/redeem-offer', error.response);
  }
};
