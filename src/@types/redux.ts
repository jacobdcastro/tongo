import * as types from '../redux/constants';
import rootReducer from '../redux/reducers';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

export type RootState = ReturnType<typeof rootReducer>;

// All possible action types for Filter reducer
export type FilterActionTypes =
  | typeof types.SET_FILTER
  | typeof types.SET_DATES
  | typeof types.RESET_DATES;

// All possible action types for Location reducer
export type FavoritesActionTypes =
  | typeof types.ADD_FAVORITE
  | typeof types.REMOVE_FAVORITE
  | typeof types.CLEAR_ALL_FAVORITES
  | typeof types.LOAD_FAVORITES;

// All possible action types for Favorites reducer
export type LocationActionTypes = typeof types.SET_LOCATION;

// All possible action types for Search reducer
export type SearchActionTypes =
  | typeof types.APPLY_POPULAR_SEARCH
  | typeof types.REMOVE_POPULAR_SEARCH;

// All possible action types for Brand reducer
export type BrandActionTypes =
  | typeof types.TOGGLE_BRAND_FILTER
  | typeof types.SET_BRAND;

// Reusable type for all actions in /redux/actions/filter.ts
export type FilterThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<FilterActionTypes>
>;

// Reusable type for all actions in /redux/actions/favorites.ts
export type FavoritesThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<FavoritesActionTypes>
>;

// Reusable type for all actions in /redux/actions/location.ts
export type LocationThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<LocationActionTypes>
>;

export type SearchThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<SearchActionTypes>
>;

export type BrandThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<BrandActionTypes>
>;
