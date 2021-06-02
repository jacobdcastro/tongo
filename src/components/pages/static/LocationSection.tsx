import React from 'react';
import styled from 'styled-components';
import { GreenHeading, PageHeading } from '../../general/headings';
import Section from './Section';
import { VenueHours } from '../../../@types/apiTypes/xanoGeneral';
import { GoogleGeocodeResult, LatLng } from '../../../@types/apiTypes/geocode';
import CardHours from './LocationCardHours';

// const USERNAME = process.env.NEXT_PUBLIC_MAPBOX_USERNAME;
const TOKEN = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const LocationCard = styled.div`
  margin-top: 15px;
  width: 100%;
  color: ${props => props.theme.pText};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;

  .map {
    top: 0;
    left: 0;
    width: 100%;
    object-fit: cover;
    border-radius: 12px 12px 0 0;
  }

  .eventInfo {
    padding: 11px 15px;
    .locationBusinessName {
      font-size: 1.3rem;
    }
    address {
      line-height: 1.2rem;
      font-size: 0.9rem;
    }
  }

  .cardLink {
    span {
      padding: 11px 15px;
      border-top: 1px solid ${props => props.theme.border};

      .cardLinkText {
        font-weight: 500;
        font-size: 0.8rem;
      }
    }
  }
`;

type CardLinkProps = {
  label: string;
  type: string;
  url: string;
  iconDimensions?: { height?: number; width?: number };
};

const CardLink = ({
  label,
  type,
  url,
  iconDimensions,
}: CardLinkProps): JSX.Element => {
  return (
    <div className="cardLink">
      <a href={url}>
        <GreenHeading
          headerType="h4"
          iconFilepath={`/assets/locationCard/${type}.svg`}
          iconAlt=""
          className="cardLinkText"
          iconDimensions={iconDimensions}
        >
          {label}
        </GreenHeading>
      </a>
    </div>
  );
};

interface PropTypes {
  name: string;
  address: string;
  phoneNumber: string;
  website: string;
  hours: VenueHours;
  coords: LatLng;
  googleUrl: string;
  geoInfo: GoogleGeocodeResult;
}

const LocationSection = ({
  name,
  address,
  phoneNumber,
  website,
  hours,
  coords,
  googleUrl,
  geoInfo,
}: PropTypes): JSX.Element => {
  return (
    <Section>
      <GreenHeading
        headerType="h2"
        iconFilename="location.svg"
        iconAlt="location icon"
        uppercase
      >
        Location
      </GreenHeading>
      <LocationCard>
        {coords && (
          <a href={googleUrl}>
            <img
              className="map"
              src={`https://maps.googleapis.com/maps/api/staticmap?zoom=15&size=400x230&markers=color:0x2FE078%7C${coords.lat},${coords.lng}&key=${TOKEN}`}
              alt=""
            />
          </a>
        )}
        <div className="eventInfo">
          <PageHeading headerType="h3" className="locationBusinessName">
            {name}
          </PageHeading>
          <address>{geoInfo && geoInfo.formatted_address}</address>
        </div>
        <CardLink type="directions" label="Get Directions" url={googleUrl} />
        {phoneNumber && (
          <CardLink
            type="phone"
            label={phoneNumber}
            url={`tel:${phoneNumber}`}
            iconDimensions={{ height: 20 }}
          />
        )}
        {website && (
          <CardLink
            type="website"
            label={
              website.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]
            }
            url={website}
          />
        )}

        <CardHours hours={hours} />
      </LocationCard>
    </Section>
  );
};

export default LocationSection;
