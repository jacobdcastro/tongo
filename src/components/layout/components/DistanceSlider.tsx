import React, { useState } from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import SliderMark from './SliderMark';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../@types/redux';
import { setDistance } from '../../../redux/actions/filter';
import { FilterState } from '../../../@types/state';

const marks = [
  {
    value: 1100,
    label: (
      <SliderMark
        label="Walking"
        alt="walking"
        iconFilename="slider-walk.svg"
      />
    ),
  },
  {
    value: 2250,
    label: (
      <SliderMark
        label="5 min<br/>drive"
        alt="car"
        iconFilename="slider-drive.svg"
      />
    ),
  },
  {
    value: 3250,
    label: (
      <SliderMark
        label="15 min<br/> drive"
        alt="car"
        iconFilename="slider-drive.svg"
      />
    ),
  },
  {
    value: 4530,
    label: (
      <SliderMark
        label="45 min<br/>drive"
        alt="car"
        iconFilename="slider-long-drive.svg"
      />
    ),
  },
];

const PrettoSlider = withStyles({
  root: {
    color: '#2FE078',
    height: 8,
    width: '90%',
    marginTop: '10px',
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#2FE078',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
  mark: {
    bottom: 20,
    height: 8,
  },
})(Slider);

const DistanceSliderContainer = styled.div`
  margin: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .sliderMarkers {
    display: flex;
    flex-direction: row;
  }
`;

interface PropTypes {
  distance: number;
  handleDistanceChange: (distance: number | number[]) => void;
}

const DistanceSlider = ({
  distance,
  handleDistanceChange,
}: PropTypes): JSX.Element => {
  const [value, setValue] = useState<number | number[]>(distance);

  return (
    <DistanceSliderContainer>
      <PrettoSlider
        valueLabelDisplay="off"
        aria-label="distance slider"
        defaultValue={2500}
        min={30}
        max={5000}
        name="distance"
        onChange={(e, newValue) => setValue(newValue)}
        onChangeCommitted={() => handleDistanceChange(value)}
        marks={marks}
      />
    </DistanceSliderContainer>
  );
};

export default DistanceSlider;
