import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { lat, lng } = req.body.coords;

  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=locality&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
  `;

  try {
    const googleRes = await axios({ method: 'GET', url });
    res.status(200);
    res.send(googleRes.data);
  } catch (error) {
    console.error('SERVERLESS FUNCTION: api/reverse-geocode', error.response);
  }
};
