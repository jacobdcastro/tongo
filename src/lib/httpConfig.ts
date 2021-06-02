import axios from 'axios';

export const xano = axios.create({
  baseURL: process.env.NEXT_PUBLIC_XANO_BASE_API_URL,
});

export const googleBusiness = axios.create({});
