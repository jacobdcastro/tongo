import { SearchThunk } from '../../@types/redux';
import { PopularSearch } from '../../@types/apiTypes/popularSearch';

export const applyPopularSearch = (
  payload: PopularSearch
): SearchThunk => async dispatch =>
  dispatch({ type: 'APPLY_POPULAR_SEARCH', payload });

export const removePopularSearch = (): SearchThunk => async dispatch =>
  dispatch({ type: 'REMOVE_POPULAR_SEARCH' });
