import axios from 'axios';
import { LatLng } from '../@types/apiTypes/geocode';

export const getGeocode = async (address: string) => {
  const encodedAddress = encodeURI(address);
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/geocode',
      data: { address: encodedAddress },
    });
    return res.data;
  } catch (error) {
    console.error('FUNCTION: getGeocode()', error.response);
  }
};

export const getDistance = async (origin: LatLng, destination: string) => {
  const { lat, lng } = origin;
  try {
    const res = await axios({
      method: 'POST',
      url: `http://maps.googleapis.com/maps/api/distancematrix/json?destinations=${encodeURI(
        destination
      )}&origins=${lat},${lng}&key=${
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      }`,
    });
    return res.data;
  } catch (error) {
    console.error('FUNCTION: getDistance()', error.response);
  }
};
