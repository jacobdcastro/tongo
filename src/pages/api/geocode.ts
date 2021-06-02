import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.address}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
  `;

  try {
    const googleRes = await axios({ method: 'GET', url });
    res.status(200);
    res.send(googleRes.data);
  } catch (error) {
    console.error('SERVERLESS FUNCTION: api/geocode', error.response);
  }
};
