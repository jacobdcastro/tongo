import { BrandThunk } from '../../@types/redux';
import { XanoBrand } from '../../@types/apiTypes/brand';

export const toggleBrandFilter = (): BrandThunk => async dispatch =>
  dispatch({ type: 'TOGGLE_BRAND_FILTER' });

export const setBrand = (payload: XanoBrand): BrandThunk => async dispatch =>
  dispatch({ type: 'SET_BRAND', payload });
