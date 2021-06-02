import * as types from '../constants';
import { BrandActionTypes } from '../../@types/redux';
import { XanoBrand } from '../../@types/apiTypes/brand';
import { BrandState } from '../../@types/state';

const initialState: BrandState = {
  id: 0,
  name: '',
  slug: '',
  type: '',
  filterOn: true,
  img: '',
};

interface BrandReducerParams {
  type: BrandActionTypes;
  payload?: XanoBrand;
}

const brandReducer = (
  state = initialState,
  { type, payload }: BrandReducerParams
): BrandState => {
  switch (type) {
    case types.SET_BRAND:
      const {
        id,
        name,
        slug,
        type: brandType,
        hero_image,
        approved_venues,
      } = payload;

      return {
        id,
        name,
        slug,
        type: brandType,
        img: hero_image.path,
        approved_venues,
        filterOn: true,
      };

    case types.TOGGLE_BRAND_FILTER:
      return { ...state, filterOn: !state.filterOn };

    default:
      return state;
  }
};

export default brandReducer;
