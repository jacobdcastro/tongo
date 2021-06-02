import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../@types/redux';
import { toggleBrandFilter } from '../../../redux/actions/brand';
import { useQueryCache } from 'react-query';

const AntSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: 'flex',
      transform: 'scale(1.65)',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: '#2FE078',
          borderColor: '#2FE078',
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  })
)(Switch);

const BrandFilterFieldset = styled.div`
  margin-top: 10px;
  position: relative;
  padding: 0;
  legend {
    font-size: 1.2rem;
    font-weight: 600;
    padding-bottom: 5px;
  }
  label {
    font-size: 0.7rem;
  }
  .MuiSwitch-root {
    position: absolute;
    right: 15px;
    top: 0;
  }
`;

const BrandFilter = (): JSX.Element => {
  const brand = useSelector((state: RootState) => state.brand);
  const dispatch = useDispatch();
  const queryCache = useQueryCache();

  const handleToggle = () => dispatch(toggleBrandFilter());

  // if no brand is set, do not render component
  if (brand.id === 0) return null;

  return (
    <BrandFilterFieldset>
      <div className="brandFilter">
        <legend>{brand.name}</legend>
        <label htmlFor="brand">
          This is an exclusivity filter provided by {brand.name}. Keep it on for
          exclusive offers and curated content. Turn it off to browse all
          content.
        </label>
        <AntSwitch
          id="brandSwitch"
          name="brand"
          checked={brand.filterOn}
          onChange={handleToggle}
        />
      </div>
    </BrandFilterFieldset>
  );
};

export default BrandFilter;
