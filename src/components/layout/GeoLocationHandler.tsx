import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLocation } from '../../redux/actions/location';

interface PropTypes {
  children: JSX.Element;
}

const GeoLocationHandler = ({ children }: PropTypes): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    if ('geolocation' in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(pos => {
        const { latitude, longitude } = pos.coords;
        dispatch(setLocation({ lat: latitude, lng: longitude }));
      });
    } else {
      /* geolocation IS NOT available */
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default GeoLocationHandler;
