import { useState } from 'react';

const useDateRangePicker = () => {
  const [value, setValue] = useState([]);
  const [hoveredDate, setHoveredDate] = useState();

  return { value, setValue, hoveredDate, setHoveredDate };
};

export default useDateRangePicker;
