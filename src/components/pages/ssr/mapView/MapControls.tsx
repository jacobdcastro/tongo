import React from 'react';
import styled from 'styled-components';
import { ZoomType } from '../../../../@types/map';
import { MapZoomButton } from '../../../general/buttons';

const Controls = styled.div`
  position: relative;
  z-index: 5;
  /* bottom: 10px; */
  float: right;
  display: flex;
  flex-direction: column;
`;

interface PropTypes {
  handleZoom: (zoomType: ZoomType) => void;
}

const MapControls = ({ handleZoom }: PropTypes): JSX.Element => {
  return (
    <Controls>
      <MapZoomButton onClick={() => handleZoom('in')}>+</MapZoomButton>
      <MapZoomButton onClick={() => handleZoom('out')}>-</MapZoomButton>
    </Controls>
  );
};

export default MapControls;
