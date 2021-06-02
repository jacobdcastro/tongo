import React from 'react';
import IconButton from './IconButton';

interface CallButtonPropTypes {
  data: {
    phoneNumber: string;
  };
}

const CallButton = ({ data }: CallButtonPropTypes): JSX.Element => {
  const { phoneNumber } = data;
  return (
    <IconButton>
      <a href={`tel:${phoneNumber}`}>
        <div className="icon">
          <img src="/assets/buttonIcons/call.svg" alt="phone icon" />
        </div>
        CALL
      </a>
    </IconButton>
  );
};

export default CallButton;
