import React from 'react';
import styled from 'styled-components';
import { XanoOffer } from '../../../@types/apiTypes/offer';

// TODO "vip" and "experience" to be own spans and developed w/ absolute positioning
const VipBadge = styled.div`
  position: relative;
  z-index: 4;
  background-color: transparent;
  height: 45px;
  width: 80%;
  top: -6px;
  left: -6px;

  .vipBadgeTemp {
    position: relative;
    z-index: 6;
    height: 44px;
  }

  span {
    position: absolute;
    z-index: 7;
    background-color: transparent;
  }
  .badgeVip {
    font-weight: 600;
    left: 10px;
    bottom: 14px;
    color: white;
    font-size: 0.9rem;
  }
  .badgeExp {
    left: 45px;
    bottom: 17px;
    font-weight: 600;
    font-size: 0.68rem;
    color: ${props => props.theme.green};
  }
`;

interface PropTypes {
  label?: string;
  offer?: XanoOffer;
  offerIsAvailable?: boolean;
}

const CardTypeLabel = ({
  label,
  offer,
  offerIsAvailable,
}: PropTypes): JSX.Element => {
  // console.log({ offer });
  if (offer && offerIsAvailable) {
    return (
      <VipBadge>
        {/* <img className="vipBadgeTemp" src="/assets/vip_label.png" /> */}
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img className="vipBadgeTemp" src="/assets/vip_label_bg.png" />
        <span className="badgeVip">VIP</span>
        <span className="badgeExp">EXPERIENCE</span>
      </VipBadge>
    );
  }

  if (label && label !== 'venue') {
    return <span className="typeLabel">{label.toUpperCase()}</span>;
  }

  return null;
};

export default CardTypeLabel;
