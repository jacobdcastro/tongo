import * as types from '../constants';
import { FilterState } from '../../@types/state';
import { FilterActionTypes } from '../../@types/redux';
import moment from 'moment';

const initialDateRange = {
  startDate: parseInt(moment().format('x')),
  endDate: parseInt(moment().add(7, 'day').format('x')),
  // endDate: null,
  label: 'This Week',
};

const TEST_initialDateRange = {
  // startDate: parseInt(moment().add(1, 'day').format('x')),
  startDate: parseInt(moment().format('x')),
  endDate: null,
  label: 'Tomorrow',
};

// INITIAL FILTER STATE
const initialState = {
  dates: initialDateRange,
  // {
  // startDate: parseInt(moment('2020-10-06T19:00:00.000Z').format('x')),
  // endDate: parseInt(moment('2020-10-08T19:00:00.000Z').format('x')),
  // label: 'Today',
  // startDate: parseInt(moment().format('x')),
  // endDate: null,
  // },
  timeOfDay: {
    anytime: false,
    morning: true,
    afternoon: true,
    evening: true,
  },
  refine: {
    specialOffers: false,
    happyHour: true,
    walkingDistance: false,
  },
  area: {
    all: true,
    downtown: false,
    funkzone: false,
    waterfront: false,
    montecito: false,
    goleta: false,
  },
  distance: 2500,
};

interface FilterReducerParams {
  type: FilterActionTypes;
  payload?: FilterState;
}

const filterReducer = (
  state = initialState,
  { type, payload }: FilterReducerParams
): FilterState => {
  switch (type) {
    case types.SET_FILTER:
      return { ...payload };

    case types.SET_DATES:
      return {
        ...state,
        dates: payload.dates,
      };

    case types.RESET_DATES:
      return {
        ...state,
        dates: initialDateRange,
      };

    default:
      return state;
  }
};

export default filterReducer;
