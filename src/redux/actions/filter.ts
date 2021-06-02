import { FilterThunk } from '../../@types/redux';
import { ReactDatesObj, FilterState } from '../../@types/state';

export const resetDates = (): FilterThunk => async dispatch =>
  dispatch({ type: 'RESET_DATES' });

export const setFilter = (state: FilterState): FilterThunk => async dispatch =>
  dispatch({ type: 'SET_FILTER', payload: state });

export const setDate = (
  dates: ReactDatesObj
): FilterThunk => async dispatch => {
  dispatch({ type: 'SET_DATES', payload: { dates } });
};
