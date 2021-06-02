export type LatLng = {
  lat: number;
  lng: number;
};

type AddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

export interface GoogleGeocodeResult {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: {
    location: LatLng;
    location_type: string;
    viewport: {
      northeast: LatLng;
      southwest: LatLng;
    };
  };
  place_id: string;
  plus_code: {
    compound_code: string;
    global_code: string;
  };
  types: string[];
}
