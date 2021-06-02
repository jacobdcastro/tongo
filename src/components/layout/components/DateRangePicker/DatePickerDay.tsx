import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface StyledDayProps {
  isHovered: boolean;
}

const StyledDay = styled.div<StyledDayProps>`
  .MuiPickersDay-day {
    /* background-color: ${props => (props.isHovered ? 'red' : 'blue')}; */
  }
`;

// interface PropTypes {
//   day: DateIOType;
//   selectedDate: DateIOType;
//   dayInCurrentMonth: boolean;
//   dayComponent: Element;
// }

const DatePickerDay = ({
  date,
  selectedDate,
  dayInCurrentMonth,
  dayComponent,
}): JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <StyledDay
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      isHovered={isHovered}
    >
      {dayComponent}
    </StyledDay>
  );
};

export default DatePickerDay;
