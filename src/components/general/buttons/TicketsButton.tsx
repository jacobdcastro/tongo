import React from 'react';
import IconButton from './IconButton';

interface TicketsButtonPropTypes {
  data: {
    ticketsLink: string;
  };
}

// TODO link to open Google maps app
const TicketsButton = ({ data }: TicketsButtonPropTypes): JSX.Element => {
  const { ticketsLink } = data;
  return (
    <IconButton>
      <a href={ticketsLink}>
        <div className="icon">
          <img src="/assets/icons/ticket.svg" alt="ticket icon" />
        </div>
        TICKETS
      </a>
    </IconButton>
  );
};

export default TicketsButton;
