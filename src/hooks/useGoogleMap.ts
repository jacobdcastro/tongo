import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../@types/redux';
import { LatLng } from '../@types/apiTypes/geocode';
import { getGeocode } from '../lib/geocode';
import { XanoListing } from '../@types/apiTypes/listing';

type ZoomType = 'in' | 'out';
export type ListingObj = {
  id: number;
  data: XanoListing;
  isHovered: boolean;
  coords: LatLng;
};

const useGoogleMap = listings => {
  const location = useSelector((state: RootState) => state.location);
  const [markersState, setMarkersState] = useState<ListingObj[]>([]);
  const [mapState, setMapState] = useState({
    zoom: 13,
    coords: {
      lat: location.coords.lat,
      lng: location.coords.lng,
    },
  });

  const fetchGeo = async address => {
    const geo = await getGeocode(address);
    return geo.results[0].geometry.location;
  };

  const buildListingArray = async (items: XanoListing[]) => {
    return Promise.all(
      items.map(async item => {
        if (item.venue_id !== 0) {
          const coords = await fetchGeo(item._venue.address1);
          return {
            id: item.id,
            data: item,
            isHovered: false,
            coords,
          };
        }
        return;
      })
    );
  };

  useEffect(() => {
    buildListingArray(listings).then(listingObjArray =>
      setMarkersState(listingObjArray)
    );
  }, []);

  const handleZoom = (zoomType: ZoomType) => {
    if (zoomType === 'in')
      setMapState({ ...mapState, zoom: mapState.zoom + 0.8 });
    if (zoomType === 'out')
      setMapState({ ...mapState, zoom: mapState.zoom - 0.8 });
  };

  return { mapState, markersState, handleZoom };
};

export default useGoogleMap;
