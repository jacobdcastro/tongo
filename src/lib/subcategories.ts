import axios from 'axios';

export const getAllSubcategories = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'https://x608-3b7f-b1ce.n7.xano.io/api:704ee1/subcategory',
    });
    return res.data;
  } catch (error) {
    console.error('FUNCTION: getAllSubcategories()', error.response);
  }
};
