/*
-- Statically Generated pages for each venue created
---- HTML is generated at build time
---- This is done to ensure proper caching and quick loading when users
------ visit and save events on the browser
*/
import React, { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticPropsContext, GetStaticProps } from 'next';
import {
  getAllVenueIds,
  getAllVenues,
  getVenueDataById,
} from '../../../lib/venues';
import BreakLine from '../../../components/general/BreakLine';
import {
  Section,
  VenuePageIntro,
  IconButtonSection,
  LocationSection,
  OfferSection,
} from '../../../components/pages/static/venue/_sections';
import CovidUpdate from '../../../components/pages/static/CovidUpdate';
import Paragraph from '../../../components/general/Paragraph';
import StaticPage from '../../../components/layout/StaticPage';
import useRedeemOffer from '../../../hooks/useRedeemOffer';
import { XanoVenue } from '../../../@types/apiTypes/venue';
import Loader from '../../../components/general/Loader';
import { GoogleGeocodeResult } from '../../../@types/apiTypes/geocode';
import { getGeocode } from '../../../lib/geocode';
import useOfferAvailable from '../../../hooks/useOfferAvailable';
import slugify from '../../../lib/slugify';

interface PropTypes {
  ctx: GetStaticPropsContext;
  data: XanoVenue;
}

const VenuePage = ({ data, ctx }: PropTypes): JSX.Element => {
  const state = useRedeemOffer();
  const offerIsAvailable = useOfferAvailable(data);
  const [geoInfo, setGeoInfo] = useState<GoogleGeocodeResult>();
  const [googleUrl, setGoogleUrl] = useState<string>();

  const fetchGeoInfo = async () => {
    const geo = await getGeocode(data.address1);
    if (!geoInfo) setGeoInfo(geo.results[0]);
    if (geoInfo) {
      setGoogleUrl(
        `https://www.google.com/maps/dir/?api=1&destination=${geoInfo.formatted_address}`
      );
    }
  };

  useEffect(() => {
    if (data) fetchGeoInfo();
  }, [data, geoInfo]);

  if (data) {
    return (
      <StaticPage
        redeemOfferState={state}
        ctx={ctx}
        data={data}
        offerIsAvailable={offerIsAvailable}
      >
        <div className="staticPageColumn left-col">
          <VenuePageIntro data={data} />
          <BreakLine />
          <IconButtonSection
            ctaButton={data.button}
            ctaButton2={data.button_2}
            call={
              data.phone_number === null
                ? null
                : {
                    type: 'call',
                    url: `tel:${data.phone_number}`,
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
          <BreakLine />
          <CovidUpdate data={data} />
          <BreakLine />

          {/* <BreakLine /> */}
          {/* <UpcomingEvents /> */}
        </div>
        <div className="staticPageColumn right-col">
          {offerIsAvailable && data._offer_of_venue.length > 0 && (
            <>
              <OfferSection
                toggleOfferDialog={state.toggleOfferDialog}
                data={data._offer_of_venue[0]}
              />
              <BreakLine />
            </>
          )}
          <LocationSection
            name={data.name}
            address={data.address1}
            phoneNumber={data.phone_number === null ? '' : data.phone_number}
            googleUrl={googleUrl && googleUrl}
            website={data.website}
            hours={data.hours_of_operation}
            geoInfo={geoInfo}
            coords={geoInfo && geoInfo.geometry.location}
          />
        </div>
      </StaticPage>
    );
  } else {
    return <Loader />;
  }
};

export default VenuePage;

// * generates URL for each venue page
export const getStaticPaths: GetStaticPaths = async () => {
  const venues = await getAllVenues();
  const paths = venues.map((venue: XanoVenue) => ({
    params: {
      id: venue.id.toString(),
      slug: slugify(venue.name),
    },
  }));
  return { paths, fallback: false };
};

// * fetches venue data for static content generation
export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext
) => {
  const data = await getVenueDataById(ctx.params.id);
  if (data) {
    const props = { ctx, data };
    return { props, revalidate: 1 };
  }
  return { props: { data: undefined, ctx }, revalidate: 1 };
};
