import React from 'react';
import { LngLatObj } from '../../../../@types/map';
import MarkerSVG from './MarkerSVG';
import styled from 'styled-components';
import { ListingObj } from '../../../../hooks/useGoogleMap';

interface MarkerContainerProps {
  lat: number;
  lng: number;
}

export const MarkerContainer = styled.div<MarkerContainerProps>`
  transition: 150ms;
  position: absolute;
  transform: translate(-50%, -100%);

  .svgMarker {
    height: 31px;
    width: auto;

    .a,
    .b {
      fill: #ffffff;
    }

    .a {
      stroke: ${props => props.theme.green};
    }
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.2) translate(-43%, -90%);

    .svgMarker {
      .a,
      .b {
        fill: ${props => props.theme.green};
      }

      .a {
        stroke: #ffffff;
      }
    }
  }
`;

interface MarkersPropTypes {
  points: ListingObj[];
}

const Markers = ({ points }: MarkersPropTypes): JSX.Element => {
  // console.log({ points });
  return (
    <>
      {points.map((point, i) => {
        const { lat, lng } = point.coords;
        return (
          <MarkerContainer key={i} lat={lat} lng={lng}>
            <MarkerSVG />
            {/* icon here */}
          </MarkerContainer>
        );
      })}
    </>
  );
};

export default Markers;
