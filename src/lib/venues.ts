import axios from 'axios';
import { XanoVenue } from '../@types/apiTypes/venue';

export const getVenueById = async (id: number): Promise<XanoVenue> => {
  try {
    const res = await axios({
      method: 'GET',
      url: `https://x608-3b7f-b1ce.n7.xano.io/api:704ee1/venue/${id}`,
    });
    return res.data;
  } catch (error) {
    console.error('FUNCTION: getVenueById()', error.response);
  }
};

export const getVenueCardById = async (id: number): Promise<XanoVenue> => {
  try {
    const res = await axios({
      method: 'GET',
      url: `https://x608-3b7f-b1ce.n7.xano.io/api:5deb20/venue/card/${id}`,
    });
    return res.data;
  } catch (error) {
    console.error('FUNCTION: getVenueById()', error.response);
  }
};

export const getAllVenueIds = async (): Promise<number[]> => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'https://x608-3b7f-b1ce.n7.xano.io/api:704ee1/venue',
    });
    return res.data.map(venue => venue.id);
  } catch (error) {
    console.error('FUNCTION: getAllVenueIds()', error.respone);
  }
};

export const getVenueDataById = async (
  id: number | number[]
): Promise<XanoVenue> => {
  try {
    const res = await axios({
      method: 'GET',
      url: `https://x608-3b7f-b1ce.n7.xano.io/api:5deb20/venue/${id}`,
    });
    return res.data;
  } catch (error) {
    console.error('FUNCTION: getVenueDataById()', error.response);
  }
};

export const getAllVenues = async (): Promise<XanoVenue[]> => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'https://x608-3b7f-b1ce.n7.xano.io/api:704ee1/venue',
    });
    return res.data;
  } catch (error) {
    console.error('FUNCTION: getAllVenues()', error.response);
  }
};

export const getVenuesByCategoryId = async (id: number) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `https://x608-3b7f-b1ce.n7.xano.io/api:5deb20/venues/${id}`,
    });
    return res.data;
  } catch (error) {
    console.error('FUNCTION: getVenuesByCategoryId()', error.response);
  }
};
