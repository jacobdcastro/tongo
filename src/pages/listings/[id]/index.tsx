import React from 'react';
import { Router } from 'next/router';

const EventsIndex = (): JSX.Element => {
  React.useEffect(() => {
    // Router.push('/');
  }, []);
  return (
    <div>
      <span>This page will live at `/events`</span>
    </div>
  );
};

export default EventsIndex;
