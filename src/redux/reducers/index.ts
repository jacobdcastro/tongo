import { combineReducers } from 'redux';
import userReducer from './user';
import favoritesReducer from './favorites';
import filterReducer from './filter';
import locationReducer from './location';
import searchReducer from './search';
import brandReducer from './brand';

// COMBINED REDUCERS
const reducers = {
  filter: filterReducer,
  user: userReducer,
  favorites: favoritesReducer,
  location: locationReducer,
  search: searchReducer,
  brand: brandReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
