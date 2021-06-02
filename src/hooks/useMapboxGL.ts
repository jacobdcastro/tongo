import { useState, useEffect, MutableRefObject } from 'react';
import mapboxgl from 'mapbox-gl';
import { useSelector } from 'react-redux';
import { RootState } from '../@types/redux';

const useMapboxGL = (mapContainerRef: MutableRefObject<null>) => {
  const [map, setMap] = useState<mapboxgl.Map>();
  const { lat, lng } = useSelector((state: RootState) => state.location.coords);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    // =====
    const kiva = new mapboxgl.LngLat(-119.7038676, 34.4227618); // kiva
    const buellton = new mapboxgl.LngLat(-120.1926505, 34.613597); // buellton
    // console.log(kiva.distanceTo(buellton));
    // =====

    const _map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 12.62,
      maxZoom: 18,
      logoPosition: 'top-right',
    });

    setMap(_map);

    return () => _map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { map, setMap };
};

export default useMapboxGL;
