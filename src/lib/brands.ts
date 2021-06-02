import axios from 'axios';

export const getAllBrands = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'https://x608-3b7f-b1ce.n7.xano.io/api:704ee1/brand',
    });
    return res.data;
  } catch (error) {
    console.error('FUNCTION: getAllBrands()', error.response);
  }
};

export const getBrandById = async (id: number) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `https://x608-3b7f-b1ce.n7.xano.io/api:704ee1/brand/${id}`,
    });
    return res.data;
  } catch (error) {
    console.error('FUNCTION: getBrandById()', error.response);
  }
};
