import React from 'react';
import GoogleMapReact from 'google-map-react';
import { ListingObj } from '../../../../hooks/useGoogleMap';
import Markers, { MarkerContainer } from './Markers';
import MarkerSVG from './MarkerSVG';

interface PropTypes {
  mapState: unknown;
  markersState: ListingObj[];
}

const GoogleMap = ({ mapState, markersState }: PropTypes) => {
  const { zoom, coords } = mapState;
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }}
      defaultCenter={coords}
      center={coords}
      zoom={zoom}
      yesIWantToUseGoogleMapApiInternals
    >
      {markersState.map((marker, i) => {
        if (marker !== undefined) {
          const { lat, lng } = marker.coords;
          return (
            <MarkerContainer key={i} lat={lat} lng={lng}>
              <MarkerSVG />
            </MarkerContainer>
          );
        }
      })}
      {/* <Markers points={markersState} /> */}
    </GoogleMapReact>
  );
};

export default GoogleMap;
