import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../@types/redux';
import useXanoImageByWindowSize from '../../hooks/useXanoImageByWindowSize';

const Banner = styled.div`
  width: 100%;
  height: 150px;
  position: relative;
  margin-top: 17px;
  border-radius: 10px;
  transition: 0.5s;

  h1 {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 3;
    font-weight: 700;
    letter-spacing: 2px;
    font-size: 1.5rem;
    color: ${props => props.theme.bg};
    padding: 0;
    margin: 0;
    margin-top: -13px; /* 1/2 height */
    text-align: center;
    line-height: 27px;
    width: 100%;
    height: 26px;
    transition: 0.5s;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
  }

  .overlay {
    border-radius: 10px;
    z-index: 2;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.25);
  }

  img {
    border-radius: 10px;
    object-fit: cover;
    z-index: 1;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  @media (min-width: 768px) {
    height: 225px;

    h1 {
      font-size: 2.3rem;
    }
  }
`;

interface PropTypes {
  title?: string;
}

const HeroBanner = ({ title }: PropTypes): JSX.Element => {
  const { brand, search, location } = useSelector((state: RootState) => state);
  const [headline, setHeadline] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>();
  const setImgSize = useXanoImageByWindowSize();

  useEffect(() => {
    if (title) setHeadline(title);
    else if (brand.id !== 0) setHeadline(brand.name);
    else if (location.city) setHeadline(location.city);
    else setHeadline('Santa Barbara');
  }, [brand, location, title]);

  useEffect(() => {
    if (search && search.hero_image) {
      setImgUrl(`
      https://x608-3b7f-b1ce.n7.xano.io${
        search.hero_image.path
      }?tpl=${setImgSize(2)}`);
    } else if (brand.id !== 0) {
      setImgUrl(
        `https://x608-3b7f-b1ce.n7.xano.io${brand.img}?tpl=${setImgSize(2)}`
      );
    } else {
      setImgUrl('/assets/heroImg/image1@3x.png');
    }
  }, [search, brand, setImgSize]);

  return (
    <Banner>
      <h1>{headline.toUpperCase()}</h1>
      <span className="overlay" />
      <img src={imgUrl} alt="" />
    </Banner>
  );
};

export default HeroBanner;
