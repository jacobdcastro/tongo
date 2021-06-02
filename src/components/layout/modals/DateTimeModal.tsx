import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import ModalContainer from './ModalContainer';
import { Dialog } from '../../../@types/dialogs';
import DayPickerRangeControllerWrapper from '../components/DateRangePicker';
import { ReactDatesObj } from '../../../@types/state';
import { RootState } from '../../../@types/redux';
import { setDate } from '../../../redux/actions/filter';
import { quickFilterOptions, QuickFilterOption } from '../../../lib/filter';
// import useDialog from '../../../hooks/useDialog';

const DateTimeModalSection = styled.div`
  /* height: 100%; */
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
`;

interface PropTypes {
  activeDialog: Dialog;
  setActiveDialog: Dispatch<SetStateAction<Dialog>>;
}

const DateTimeModal = ({
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

  const handleQuickFilterSelect = async (option: QuickFilterOption) => {
    await option.setNewDates(setState);
    setActiveDialog(null);
  };

  const handleSubmit = () => {
    dispatch(setDate(state));
    setActiveDialog(null);
  };
  const handleClear = () => {
    setState({ startDate: null, endDate: null, label: 'All Dates' });
    setActiveDialog(null);
  };

  useEffect(() => {
    if (activeDialog === 'datetime') toggleActive(true);
    else toggleActive(false);
  }, [activeDialog]);

  useEffect(() => {
    // dispatch(setDate(state));
  }, [state]);

  return (
    <ModalContainer
      title="Date Range"
      isActive={isActive}
      setActiveDialog={setActiveDialog}
      handleSubmit={handleSubmit}
      handleCancel={handleClear}
    >
      <DateTimeModalSection>
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
      </DateTimeModalSection>
    </ModalContainer>
  );
};

export default DateTimeModal;
