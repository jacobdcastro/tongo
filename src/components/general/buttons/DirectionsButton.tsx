import React from 'react';
import IconButton from './IconButton';

interface DirectionsButtonPropTypes {
  googleUrl: string;
}

// TODO link to open Google maps app
const DirectionsButton = ({
  googleUrl,
}: DirectionsButtonPropTypes): JSX.Element => {
  return (
    <IconButton>
      <a href={encodeURI(googleUrl)}>
        <div className="icon">
          <img src="/assets/buttonIcons/directions.svg" alt="directions icon" />
        </div>
        DIRECTIONS
      </a>
    </IconButton>
  );
};

export default DirectionsButton;
