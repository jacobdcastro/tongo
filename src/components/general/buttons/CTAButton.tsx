import React from 'react';
import { XanoCTAButton } from '../../../@types/apiTypes/xanoGeneral';
import IconButton from './IconButton';

interface CTAButtonPropTypes {
  data: XanoCTAButton;
}

const CTAButton = ({ data }: CTAButtonPropTypes): JSX.Element => {
  if (data === null || data === undefined || data.type === '') return null;
  const { type, url, label } = data;
  return (
    <IconButton>
      <a href={url}>
        <div className="icon">
          <img src={`/assets/buttonIcons/${type}.svg`} alt={`${type} icon`} />
        </div>
        <span>{label}</span>
      </a>
    </IconButton>
  );
};

export default CTAButton;
