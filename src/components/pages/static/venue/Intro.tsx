import React, { useState } from 'react';
import { GreenHeading, PageHeading } from '../../../general/headings';
import PageIntro from '../PageIntroSection';
import Section from '../Section';
import { XanoVenue } from '../../../../@types/apiTypes/venue';
import { createVenueHoursStringForCard } from '../../../../lib/dates';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../@types/redux';
import moment from 'moment';

interface VenuePageIntroPropTypes {
  data: XanoVenue;
}

const VenuePageIntro = ({ data }: VenuePageIntroPropTypes): JSX.Element => {
  const dates = useSelector((state: RootState) => state.filter.dates);

  return (
    <Section>
      <PageIntro>
        <div className="container">
          <GreenHeading className="time" headerType="h2" uppercase>
            {createVenueHoursStringForCard(
              data.hours_of_operation,
              dates,
              data.id,
              parseInt(moment().format('x'))
            )}
          </GreenHeading>
          <PageHeading className="eventTitle" headerType="h1">
            {data.name}
          </PageHeading>
          <div className="introSubHead">
            <h3>
              {data.subcategories.length > 0
                ? data.subcategories[0]._subcategory.name
                : 'Venue'}{' '}
              &#9679; {data.price}
              {/* &#9679; 0.3mi */}
            </h3>
          </div>
        </div>
      </PageIntro>
    </Section>
  );
};

export default VenuePageIntro;
