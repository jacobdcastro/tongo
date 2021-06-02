import React, { useState } from 'react';
import { DayPickerRangeController, isInclusivelyBeforeDay } from 'react-dates';
import moment from 'moment';
import { ReactDatesObj } from '../../../../@types/state';

const START_DATE = 'startDate';
const END_DATE = 'endDate';

interface PropTypes {
  state: ReactDatesObj;
  setState: React.Dispatch<React.SetStateAction<ReactDatesObj>>;
}

const DayPickerRangeControllerWrapper = ({
  state,
  setState,
}: PropTypes): JSX.Element => {
  const [focusedInput, setFocusedInput] = useState<string>(START_DATE);
  const { startDate, endDate } = state;

  return (
    <DayPickerRangeController
      startDate={moment(startDate)}
      endDate={endDate ? moment(endDate) : null}
      onDatesChange={setState}
      focusedInput={focusedInput}
      onFocusChange={newFocusedInput => {
        setFocusedInput(!newFocusedInput ? START_DATE : newFocusedInput);
      }}
      initialVisibleMonth={() => moment()}
      isOutsideRange={day => (moment().diff(day, 'days') > 0 ? true : false)}
    />
  );
};

export default DayPickerRangeControllerWrapper;
