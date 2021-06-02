import React from 'react';
import SVGIcon from '../SVGIcon';

const ShareButton = (): JSX.Element => {
  return (
    <SVGIcon onClick={() => console.log('share clicked!')}>
      <img
        className="icon share"
        src="/assets/icons/share.svg"
        alt="share icon"
      />
    </SVGIcon>
  );
};

export default ShareButton;
