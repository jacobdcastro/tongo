import axios from 'axios';
import { getAllListings } from './listings';
//
//
// ? FOR ONE CATEGORY
// 1. get single category object by ID
// 2. get all listings
// 3. filter listings array
// --- for each listing, go through each subcategory
// --- for each subcategory, check if category_id === id
// --- if equal, push to category object's listing[]
//
//

export const getAllCategoryIds = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `https://x608-3b7f-b1ce.n7.xano.io/api:704ee1/category`,
    });

    return res.data.map(cat => cat.id);
  } catch (error) {
    console.error('FUNCTION: getAllCategoryIds()', error.response);
  }
};

export const getAllListingsOfAllCategories = async (ids: number[]) => {
  try {
    return Promise.all(ids.map(id => getListingsByCategoryId(id)));
  } catch (error) {
    console.error('FUNCTION: getAllListingsOfAllCategories()', error.response);
  }
};

export const getListingsByCategoryId = async (id: number) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `https://x608-3b7f-b1ce.n7.xano.io/api:5deb20/category/${id}`,
    });
    return res.data;
  } catch (error) {
    console.error('FUNCTION: getListingsByCategoryId()', error.response);
  }
};
