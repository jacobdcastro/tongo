import React from 'react';
import { HTagTypes } from '../../../@types/general';

interface HTagPropTypes {
  type: HTagTypes;
  children: string;
  className?: string;
}

const HTag = ({ type, children, className }: HTagPropTypes): JSX.Element => {
  if (type === 'h1') return <h1 className={className || ''}>{children}</h1>;
  if (type === 'h2') return <h2 className={className || ''}>{children}</h2>;
  if (type === 'h3') return <h3 className={className || ''}>{children}</h3>;
  if (type === 'h4') return <h4 className={className || ''}>{children}</h4>;
  if (type === 'h5') return <h5 className={className || ''}>{children}</h5>;
  if (type === 'h6') return <h6 className={className || ''}>{children}</h6>;
};

export default HTag;
