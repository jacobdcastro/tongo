import React from 'react';
import Carousel from './Carousel';
import ResultsCardSkeleton from '../cards/LoadingCard';
import CategorySection from './CategorySection';
import styled from 'styled-components';
import pulsate from '../../../styles/keyframes/Pulsate';

const TitleLoader = styled.div`
  height: 25px;
  width: 180px;
  animation: 2s ${pulsate} infinite;
  border-radius: 2px;
`;

const LoadingCarousel = (): JSX.Element => {
  return (
    <CategorySection>
      <div className="sectionHeader">
        <TitleLoader />
      </div>
      <div className="scrollArea">
        <div>
          <Carousel listingNum={6}>
            <ResultsCardSkeleton isFullWidth={false} />
            <ResultsCardSkeleton isFullWidth={false} />
            <ResultsCardSkeleton isFullWidth={false} />
            <ResultsCardSkeleton isFullWidth={false} />
            <ResultsCardSkeleton isFullWidth={false} />
            <ResultsCardSkeleton isFullWidth={false} />
          </Carousel>
        </div>
      </div>
    </CategorySection>
  );
};

export default LoadingCarousel;
