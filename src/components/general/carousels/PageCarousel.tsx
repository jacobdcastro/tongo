import React from 'react';
import useCarousel from '../../../hooks/useCarousel';
import Carousel from './Carousel';
import { Event } from '../../../@types/EventData';
import VenueCarouselCard from './VenuePageCarouselCard';

interface PropTypes {
  events: Event[];
}

const PageCarousel = ({ events }: PropTypes): JSX.Element => {
  const { state, handlers } = useCarousel(225);

  return (
    <Carousel
      {...handlers}
      eventNum={events.length}
      translateVal={state.currentTranslateVal}
      changeVal={state.changeVal}
    >
      {events.map((event, i) => (
        <VenueCarouselCard key={i} data={event} />
      ))}
    </Carousel>
  );
};

export default PageCarousel;
