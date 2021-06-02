import { LocationThunk } from '../../@types/redux';
import { LocationState } from '../reducers/location';
import axios from 'axios';

type LocationParam = {
  lat: number;
  lng: number;
};

export const setLocation = (
  coords: LocationParam
): LocationThunk => async dispatch => {
  const { lat, lng } = coords;

  const payload: LocationState = {
    city: '',
    coords: { lat, lng },
  };

  try {
    const res = await axios({
      method: 'POST',
      url: '/api/reverse-geocode',
      data: { coords },
    });

    payload.city = res.data.results[0].address_components[0].long_name;

    dispatch({ type: 'SET_LOCATION', payload });
  } catch (error) {
    console.error('FUNCTION: setLocation()', error.response);
  }
};
