import React, { useState, useEffect, useMemo } from 'react';
import { RootState } from '../../../../@types/redux';
import { useSelector } from 'react-redux';
import ReactMapGL, { ViewportProps } from 'react-map-gl';
import { useWindowDimensions } from 'window-dimensions-hooks';
import Markers from './Markers';
import { LngLatObj } from '../../../../@types/map';

const data: LngLatObj[] = [
  { lng: -119.7038676, lat: 34.4287618 },
  { lng: -119.7256505, lat: 34.433597 },
  { lng: -119.699265, lat: 34.416597 },
  { lng: -119.725068, lat: 34.420547 },
];

const MapboxMap = (): JSX.Element => {
  const { wHeight, wWidth } = useWindowDimensions();
  const { lat, lng } = useSelector((state: RootState) => state.location.coords);
  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: lng,
    zoom: 11.999999999,
    altitude: 1.5,
  });

  // redraws map if window is resized
  useEffect(() => {
    setViewport(viewport);
  }, [viewport, wHeight, wWidth]);

  // "cache" all markers so they don't rerender <ReactMapGL> does
  const markersLayer = useMemo(() => <Markers points={data} />, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <ReactMapGL
        {...viewport}
        height="100%"
        width="100%"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        onViewportChange={(newViewport: ViewportProps) =>
          setViewport(newViewport)
        }
        doubleClickZoom
        altitude={1.5}
      >
        {markersLayer}
      </ReactMapGL>
    </div>
  );
};

export default MapboxMap;
