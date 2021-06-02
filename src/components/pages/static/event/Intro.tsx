import React from 'react';
import Link from 'next/link';
import { GreenHeading, PageHeading } from '../../../general/headings';
import PageIntro from '../PageIntroSection';
import Section from '../Section';
import { XanoListing } from '../../../../@types/apiTypes/listing';
import { createListingHoursString } from '../../../../lib/dates';
import slugify from '../../../../lib/slugify';

interface EventPageIntroPropTypes {
  data: XanoListing;
  datetime: string | string[] | Date | number;
}

const EventPageIntro = ({
  data,
  datetime,
}: EventPageIntroPropTypes): JSX.Element => {
  return (
    <Section>
      <PageIntro>
        <div className="container">
          <GreenHeading className="time" headerType="h2" uppercase>
            {createListingHoursString(datetime, data)}
          </GreenHeading>

          <PageHeading className="eventTitle" headerType="h1">
            {data.title}
          </PageHeading>
          <div className="introSubHead">
            <Link
              href="/venue/[id]/[slug]"
              as={`/venue/${data._venue.id}/${slugify(data._venue.name)}`}
            >
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>
                {data._venue.name}
                <img
                  className="rightArrow"
                  src="/assets/icons/chevron-right.svg"
                  alt="right arrow"
                />
              </a>
            </Link>
          </div>
        </div>
      </PageIntro>
    </Section>
  );
};

export default EventPageIntro;
