import axios from 'axios';
import { XanoListing } from '../@types/apiTypes/listing';

export const getAllEventIds = async (): Promise<number[]> => {
  try {
    const { data } = await axios({
      method: 'GET',
      url: 'https://x608-3b7f-b1ce.n7.xano.io/api:704ee1/listing',
    });
    const filteredArr = data.filter(item => item.type === 'event');
    const ids = filteredArr.map(event => event.id);
    return ids;
  } catch (error) {
    console.error('FUNCTION: getAllEventIds()', error.response);
  }
};

export const getEventDataById = async (id: number): Promise<XanoListing> => {
  try {
    const res = await axios({
      method: 'GET',
      url: `https://x608-3b7f-b1ce.n7.xano.io/api:704ee1/listing/${id}`,
    });
    return res.data;
  } catch (error) {
    console.error('FUNCTION: getEventDataById()', error.response);
  }
};

// todo in different file
// export const getBrandPaths = () => {}

// todo in different file
// export const getOfferPaths = () => {}
