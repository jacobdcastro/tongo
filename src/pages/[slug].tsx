import React, { useEffect } from 'react';
import { getAllBrands } from '../lib/brands';
import { XanoBrand } from '../@types/apiTypes/brand';
import { GetServerSideProps } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../@types/redux';
import { setBrand } from '../redux/actions/brand';
import Home from '../components/pages/ssr/Home';
import { getAllPopularSearches } from '../lib/popularSearches';
import { PopularSearch } from '../@types/apiTypes/popularSearch';
import useQueryCount from '../hooks/useQueryCount';
import { removePopularSearch } from '../redux/actions/search';
import Head from 'next/head';
import popularSearches from '../../data/popular-searches';

interface PropTypes {
  brandData: XanoBrand;
}

const BrandUrlPage = ({ brandData }: PropTypes): JSX.Element => {
  const { search, brand } = useSelector((state: RootState) => state);
  const counter = useQueryCount();
  const dispatch = useDispatch();

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('brand_id', brandData.id.toString());
  }

  useEffect(() => {
    if (brandData) dispatch(setBrand(brandData));
  }, [brandData, dispatch]);

  useEffect(() => {
    if (search !== null) dispatch(removePopularSearch());
  }, [dispatch, search]);

  // * hard-coded handler to skip hidden popular search
  useEffect(() => {
    if (counter.queryCount === 2) {
      counter.handleQueryCompletion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter.queryCount]);

  return (
    <>
      <Head>
        <title>{`Trusted Recommendations & VIP Experiences${
          brand.id !== 0 ? ' from ' + brand.name : ''
        } | TONGO`}</title>
      </Head>
      <Home
        data={popularSearches}
        brandId={brandData.id}
        carouselQueryCounter={counter}
      />
    </>
  );
};

export default BrandUrlPage;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const brands: XanoBrand[] = await getAllBrands();
  const brand = brands.find(b => b.slug === ctx.params.slug) || null;
  return { props: { brandData: brand } };
};
