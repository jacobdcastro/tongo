// ? to be used with the useCarousel custom hook
import styled from 'styled-components';

const setGridColumns = (isMap: boolean, num: number, isMobile: boolean) => {
  let str = '';
  for (let i = 0; i <= num; i++) {
    isMap
      ? (str += '320px ')
      : (str += isMobile ? '220px ' : 'calc(25% - 19px) ');
  }
  return str.trim();
};

interface CarouselStyledProps {
  isMap?: boolean;
  listingNum?: number;
}

const Carousel = styled.div<CarouselStyledProps>`
  display: grid;
  grid-template-columns: ${props =>
    setGridColumns(props.isMap, props.listingNum, true)};
  grid-column-gap: 25px;
  margin: 15px 0;
  /* transition-duration: 0.5s; */

  @media (min-width: 1010px) {
    grid-template-columns: ${props =>
      setGridColumns(props.isMap, props.listingNum, false)};
  }
`;

export default Carousel;
