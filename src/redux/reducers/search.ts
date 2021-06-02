import * as types from '../constants';
import { PopularSearch } from '../../@types/apiTypes/popularSearch';
import { SearchActionTypes } from '../../@types/redux';

const searchReducer = (state = null, action): PopularSearch => {
  switch (action.type) {
    case types.APPLY_POPULAR_SEARCH:
      return { ...action.payload };

    case types.REMOVE_POPULAR_SEARCH:
      return null;
    default:
      return state;
  }
};

export default searchReducer;

//
//
//
// ! =========================================
// ? HOW SEARCH WILL WORK
// ! =========================================
//
// * 0. Initial search state === null
//
// * 1. URL query contains Popular Search ID (/search?item=1)
//
// * 2. Fetch PS by ID
//
// * 3. Set PS object in state through searchReducer
//
// * 4. If search state === null, redirect to index page (/)
//
// * 5. Allow useFilterCheck to subscribe to search state, and set isVisible according to category/subcategory list in PS obj
//
// * 6. Add NextJS api endpoint to /search/fetch popular search listings results to improve client-side perfomance
