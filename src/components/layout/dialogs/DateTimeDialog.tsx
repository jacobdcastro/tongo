import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import DialogContainer from './DialogContainer';
import { Dialog } from '../../../@types/dialogs';
import DayPickerRangeControllerWrapper from '../components/DateRangePicker';
import { ReactDatesObj } from '../../../@types/state';
import { RootState } from '../../../@types/redux';
import { resetDates, setDate } from '../../../redux/actions/filter';
import { quickFilterOptions, QuickFilterOption } from '../../../lib/filter';
// import useDialog from '../../../hooks/useDialog';

const DateTimeDialogSection = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  .quickFilters {
    li {
      padding: 7px 15px;
      display: flex;
      flex-direction: row;
      align-items: center;

      &:hover {
        background-color: ${props => props.theme.border};
      }

      button {
        font-size: 1.25rem;
        margin-left: 10px;
        background-color: transparent;
        border: none;
        width: 100%;
        text-align: left;
      }
      button:hover {
        cursor: pointer;
      }
    }
  }

  .datePicker {
    display: flex;
    justify-content: center;
  }

  @media (min-width: 768px) {
    flex-direction: row;

    .quickFilters li button {
      margin-left: 0;
    }
  }
`;

interface PropTypes {
  activeDialog: Dialog;
  setActiveDialog: Dispatch<SetStateAction<Dialog>>;
}

const DateTimeDialog = ({
  activeDialog,
  setActiveDialog,
}: PropTypes): JSX.Element => {
  const [isActive, toggleActive] = useState(false);
  const dispatch = useDispatch();
  const { startDate, endDate } = useSelector(
    (state: RootState) => state.filter.dates
  );
  const [state, setState] = useState<ReactDatesObj>({
    startDate,
    endDate,
    label: 'All Dates',
  });

  const handleQuickFilterSelect = (option: QuickFilterOption) => {
    const newDateObj = option.getNewDates();
    setState(newDateObj);
    dispatch(setDate(newDateObj));
    setActiveDialog(null);
  };

  const handleSubmit = () => {
    dispatch(setDate(state));
    setActiveDialog(null);
  };

  const handleClear = () => {
    dispatch(resetDates());
    setActiveDialog(null);
  };

  useEffect(() => {
    setState({ startDate, endDate, label: null });
  }, [startDate, endDate]);

  useEffect(() => {
    if (activeDialog === 'datetime') toggleActive(true);
    else toggleActive(false);
  }, [activeDialog]);

  return (
    <DialogContainer
      title="Time"
      isActive={isActive}
      setActiveDialog={setActiveDialog}
      handleSubmit={handleSubmit}
      handleCancel={handleClear}
      type="datetime"
    >
      <DateTimeDialogSection>
        <div className="quickFilters">
          {quickFilterOptions.map(
            (option: QuickFilterOption, index: number) => (
              <li key={index}>
                <button
                  className="timeButton"
                  onClick={() => handleQuickFilterSelect(option)}
                >
                  {option.label}
                </button>
              </li>
            )
          )}
        </div>
        <div className="datePicker">
          <DayPickerRangeControllerWrapper state={state} setState={setState} />
        </div>
      </DateTimeDialogSection>
    </DialogContainer>
  );
};

export default DateTimeDialog;
