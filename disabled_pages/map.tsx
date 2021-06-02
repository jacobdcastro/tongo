import React from 'react';
import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import SsrPage from '../src/components/layout/SsrPage';
import MapControls from '../src/components/pages/ssr/mapView/MapControls';
import { PageType } from '../src/@types/general';
import MapCarousel from '../src/components/general/carousels/MapCarousel';
import GoogleMap from '../src/components/pages/ssr/mapView/GoogleMap';
import { getAllListings } from '../src/lib/listings';
import useGoogleMap from '../src/hooks/useGoogleMap';

const MapView = styled.div`
  top: 0;
  left: 0;
  z-index: 2;
  height: calc(100vh - 147px);
  width: 100%;
  position: relative;

  .componentOverlay {
    position: absolute;
    width: 100%;
    bottom: 0;
    z-index: 3;
    display: flex;
    flex-direction: column;
    padding: 17px;
  }

  /* .mapboxgl-map {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .mapboxgl-ctrl-attrib {
    display: none;
  } */

  .gmnoprint,
  .gm-fullscreen-control {
    display: none;
  }
`;

const MapPage = ({ data }): JSX.Element => {
  const { mapState, handleZoom, markersState } = useGoogleMap(data);

  return (
    <SsrPage ctx={{}} pageType={PageType.Map}>
      <MapView>
        <div className="componentOverlay">
          <div>{/* <MapControls handleZoom={handleZoom} />{' '} */}</div>
          <div>{/* <MapCarousel listings={data} /> */}</div>
        </div>

        {/* Google Maps React Container */}
        <GoogleMap mapState={mapState} markersState={markersState} />
      </MapView>
    </SsrPage>
  );
};

export default MapPage;

// * This gets called on every request (as SSR page)
export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch data from Xano API
  const data = await getAllListings();
  data.pop();
  data.pop();
  // Pass data to the page via props
  return { props: { data } };
};
