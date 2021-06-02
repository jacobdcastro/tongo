import React from 'react';
import { GreenHeading } from '../../../general/headings';
import Section from '../Section';
import PageCarousel from '../../../general/carousels/PageCarousel';
import { allEvents } from '../../../../../data/home-events';
import { BlackWideButton } from '../../../general/buttons';

const UpcomingEvents = (): JSX.Element => {
  return (
    <Section>
      <GreenHeading
        headerType="h2"
        iconFilename="calendar-check.svg"
        iconAlt="calendar icon"
        uppercase
      >
        Specials &amp; Events
      </GreenHeading>
      <PageCarousel events={allEvents} />
      <BlackWideButton onClick={() => console.log('click')} uppercase>
        Show All
      </BlackWideButton>
    </Section>
  );
};

export default UpcomingEvents;
