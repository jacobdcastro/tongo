/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { XanoBrand } from '../@types/apiTypes/brand';
import { RootState } from '../@types/redux';
import { getBrandById } from '../lib/brands';
import { setBrand } from '../redux/actions/brand';

const useInitialBrandSetter = (): void => {
  const brand = useSelector((state: RootState) => state.brand);
  const dispatch = useDispatch();

  const set = useCallback(async (brandId: number) => {
    const brandData: XanoBrand = await getBrandById(brandId);
    dispatch(setBrand(brandData));
  }, []);

  useEffect(() => {
    if (typeof localStorage !== 'undefined' && brand) {
      if (brand.id === 0) {
        const brandId = parseInt(localStorage.getItem('brand_id'));
        if (brandId && brandId !== 0) set(brandId);
      }
    }
  }, [brand]);
};

export default useInitialBrandSetter;
