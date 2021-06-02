import React, { useCallback, useEffect, useState } from 'react';
import FilterBtn from './FilterBtn';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../@types/redux';
import moment from 'moment';

const Lower = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  padding: 0 10px 8px;
  z-index: 5;
  top: 78px;

  @media (min-width: 768px) {
    position: fixed;
    z-index: 8;
    top: 27px;
    left: 390px;
    width: auto;
  }
`;

interface PropTypes {
  setActiveDialog: (str: string) => void;
}

const LowerHeader = ({ setActiveDialog }: PropTypes): JSX.Element => {
  const location = useSelector((state: RootState) => state.location);
  const { startDate, endDate, label } = useSelector(
    (state: RootState) => state.filter.dates
  );
  const [dateText, setDateText] = useState<string>('This Week');

  const setDateTextStr = useCallback(() => {
    if (label) setDateText(label);
    else {
      const str =
        moment(startDate).format('MMM Do') +
        (endDate ? ` - ${moment(endDate).format('MMM Do')}` : '');

      setDateText(str);
    }
  }, [endDate, label, startDate]);

  useEffect(() => {
    setDateTextStr();
  }, [startDate, endDate, setDateTextStr]);

  return (
    <Lower className="lower-header">
      <>
        <FilterBtn onClick={() => setActiveDialog('datetime')}>
          {dateText}
        </FilterBtn>
      </>
      <>
        <FilterBtn>{location.city}</FilterBtn>
      </>
      {/* <FilterBtn onClick={() => setActiveDialog('location')}> */}
      {/* <FilterBtn onClick={() => setActiveDialog('filter')}>Filters</FilterBtn> */}
    </Lower>
  );
};

export default LowerHeader;
