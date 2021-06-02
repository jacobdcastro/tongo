import * as types from '../constants';

type FavoritesState = string[];

// INITIAL FAVORITES STATE
const initialState: FavoritesState = ['id123', 'id456', 'id789'];

// TIMER REDUCER
const favoritesReducer = (
  state = initialState,
  { type, payload }
): FavoritesState => {
  switch (type) {
    case types.ADD_FAVORITE:
      state.push(...payload);
      return state;
    default:
      return state;
  }
};

export default favoritesReducer;
