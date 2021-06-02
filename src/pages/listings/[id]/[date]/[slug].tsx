/*
-- Statically Generated pages for each event created
-- HTML is generated at build time
-- This is done to ensure proper caching and quick loading when users
---- visit and save events on the browser
*/
import React, { useState, useEffect } from 'react';
import { GetStaticPaths, GetStaticPropsContext, GetStaticProps } from 'next';
import { getEventDataById } from '../../../../lib/events';
import BreakLine from '../../../../components/general/BreakLine';
import {
  Section,
  EventPageIntro,
  IconButtonSection,
  LocationSection,
} from '../../../../components/pages/static/event/_sections';
import useRedeemOffer from '../../../../hooks/useRedeemOffer';
import StaticPage from '../../../../components/layout/StaticPage';
import { getGeocode } from '../../../../lib/geocode';
import { XanoListing } from '../../../../@types/apiTypes/listing';
import { GoogleGeocodeResult } from '../../../../@types/apiTypes/geocode';
import Loader from '../../../../components/general/Loader';
import Paragraph from '../../../../components/general/Paragraph';
import { getAllListings } from '../../../../lib/listings';
import slugify, { generateListingPath } from '../../../../lib/slugify';

interface PropTypes {
  ctx: GetStaticPropsContext;
  data: XanoListing;
}

const EventPage = ({ data, ctx }: PropTypes): JSX.Element => {
  const state = useRedeemOffer();
  const [geoInfo, setGeoInfo] = useState<GoogleGeocodeResult>();
  const [googleUrl, setGoogleUrl] = useState<string>();

  useEffect(() => {
    const fetchGeoInfo = async () => {
      const geo = await getGeocode(data._venue.address1);
      if (!geoInfo) setGeoInfo(geo.results[0]);
      if (geoInfo) {
        setGoogleUrl(
          `https://www.google.com/maps/dir/?api=1&destination=${geoInfo.formatted_address}`
        );
      }
    };

    if (data) fetchGeoInfo();
  }, [data, geoInfo]);

  if (data && geoInfo) {
    return (
      <StaticPage redeemOfferState={state} ctx={ctx} data={data}>
        <div className="staticPageColumn">
          <EventPageIntro
            data={data}
            datetime={parseInt(
              typeof ctx.params.date === 'string' && ctx.params.date
            )}
          />
          <BreakLine />
          <IconButtonSection
            ctaButton={data._venue.button}
            ctaButton2={data._venue.button_2}
            call={
              data._venue.phone_number === null
                ? null
                : {
                    type: 'call',
                    url: `tel:${data._venue.phone_number}`,
                    label: 'Call',
                  }
            }
            directions={
              !googleUrl
                ? null
                : { type: 'directions', url: googleUrl, label: 'Directions' }
            }
          />
          <BreakLine />
          <Section>
            <Paragraph content={data.description} staticPage />
          </Section>
          {/* <BreakLine /> */}
          {/* <RelatedEvents /> */}
        </div>
        <div className="staticPageColumn">
          <BreakLine />
          <LocationSection
            name={data._venue.name}
            address={geoInfo && geoInfo.formatted_address}
            phoneNumber={
              data._venue.phone_number === null ? '' : data._venue.phone_number
            }
            googleUrl={googleUrl && googleUrl}
            website={data._venue.website}
            hours={data._venue.hours_of_operation}
            geoInfo={geoInfo}
            coords={geoInfo && geoInfo.geometry.location}
          />
          <BreakLine />
          {/* <OfferSection toggleOfferDialog={state.toggleOfferDialog} /> */}
        </div>
      </StaticPage>
    );
  } else {
    return <Loader />;
  }
};

export default EventPage;

// * generates URL for each event page
export const getStaticPaths: GetStaticPaths = async () => {
  const listings = await getAllListings();
  const paths = listings.map((listing: XanoListing) => ({
    params: {
      id: listing.id.toString(),
      date: listing.start_date_time.toString(),
      slug: slugify(listing.title),
    },
  }));
  return { paths, fallback: false };
};

// * fetches event data for static content generation
export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext
) => {
  // if event doesn't exist, data === undefined and display 404 message
  const data = await getEventDataById(ctx.params.id);

  if (data) {
    const props = { ctx, data };
    return { props };
  } else {
    return { props: { data: undefined, ctx } };
  }
};
