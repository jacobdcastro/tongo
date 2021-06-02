import React from 'react';
import SVGIconButton from '../SVGIcon';

interface PropTypes {
  handleClick: () => unknown;
}

const SaveButton = ({ handleClick }: PropTypes): JSX.Element => {
  return (
    <SVGIconButton onClick={handleClick}>
      <img
        className="icon save"
        src="/assets/icons/bookmark.svg"
        alt="save icon"
      />
    </SVGIconButton>
  );
};

export default SaveButton;
