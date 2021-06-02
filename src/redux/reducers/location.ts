import * as types from '../constants';

export interface LocationState {
  city?: string;
  coords?: {
    lat: number;
    lng: number;
  };
}

// default Santa Barbar Location
const initialState: LocationState = {
  city: 'Santa Barbara',
  coords: {
    lat: 34.42240786011285,
    lng: -119.7032006197828,
  },
};

interface LocationAction {
  type: string;
  payload?: LocationState;
}

// LOCATION REDUCER
const locationReducer = (
  state = initialState,
  { type, payload }: LocationAction
): LocationState => {
  switch (type) {
    case types.SET_LOCATION:
      return payload;
    default:
      return state;
  }
};

export default locationReducer;
