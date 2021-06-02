import React from 'react';
import Link from 'next/link';
import { GreenHeading } from '../../../general/headings';
import Section from '../Section';
import PageCarousel from '../../../general/carousels/PageCarousel';
import { allEvents } from '../../../../../data/home-events';
import { BlackWideButton } from '../../../general/buttons';

const RelatedEvents = (): JSX.Element => {
  return (
    <Section>
      <GreenHeading
        headerType="h2"
        iconFilename="calendar-check.svg"
        iconAlt="calendar icon"
        uppercase
      >
        Similar Events
      </GreenHeading>
      <PageCarousel events={allEvents} />
      <Link href="/categories/[slug]">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className="exploreLink">
          <BlackWideButton uppercase>Show All Events</BlackWideButton>
        </a>
      </Link>
    </Section>
  );
};

export default RelatedEvents;
