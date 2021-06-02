import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import styled from 'styled-components';
import DialogContainer from './DialogContainer';
import { Dialog } from '../../../@types/dialogs';
import Checkbox from '../components/Checkbox';
import BrandFilter from '../components/BrandFilter';
import DistanceSlider from '../components/DistanceSlider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../@types/redux';
import { ReactDatesObj, FilterState } from '../../../@types/state';
import { setFilter } from '../../../redux/actions/filter';

interface ListItem {
  label: string;
  child: string;
  subLabel?: string;
}

const timeOfDayList: ListItem[] = [
  { label: 'Morning', child: 'morning', subLabel: 'Before 12pm' },
  { label: 'Afternoon', child: 'afternoon', subLabel: 'After 12pm' },
  { label: 'Evening', child: 'evening', subLabel: 'After 5pm' },
];
const refineList: ListItem[] = [
  { label: 'Special offers', child: 'specialOffers' },
  { label: 'Happy Hour', child: 'happyHour' },
  { label: 'Walking Distance', child: 'walkingDistance' },
];
// const areaList: ListItem[] = [
//   { label: 'All', child: 'all' },
//   { label: 'Downtown', child: 'downtown' },
//   { label: 'Funkzone', child: 'funkzone' },
//   { label: 'Waterfront', child: 'waterfront' },
//   { label: 'Montecito', child: 'montecito' },
//   { label: 'Goleta', child: 'goleta' },
// ];

const Form = styled.form`
  min-height: 600px;
  /* display: flex;
  flex-direction: column;
  justify-content: space-between; */

  fieldset {
    margin: 20px auto 50px;
    position: relative;
    padding: 0;
    legend {
      font-size: 1.2rem;
      font-weight: 700;
      padding-bottom: 10px;
      text-transform: uppercase;
    }
    label {
      font-size: 0.7rem;
    }
    .MuiSwitch-root {
      position: absolute;
      right: 19px;
      top: 10px;
    }

    .checkboxSection {
      /* display: grid; */
    }

    .timeOfDaySection,
    .refineSection {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
    }

    .areaSection {
      display: grid;
      grid-template-columns: calc(100% / 3) calc(100% / 3) calc(100% / 3);
      grid-template-rows: 50px 50px;
      margin: auto;
    }
  }
`;

interface PropTypes {
  activeDialog: Dialog;
  setActiveDialog: Dispatch<SetStateAction<Dialog>>;
}

const FiltersDialog = ({
  activeDialog,
  setActiveDialog,
}: PropTypes): JSX.Element => {
  const [isActive, toggleActive] = useState(false);
  const dispatch = useDispatch();
  const filterState = useSelector((state: RootState) => state.filter);
  const [state, setState] = useState<FilterState>(filterState);

  const handleButtonChange = (parent: string, child: string) => {
    setState({
      ...state,
      [parent]: {
        ...state[parent],
        [child]: !state[parent][child],
      },
    });
  };

  const handleDistanceChange = (distance: number) =>
    setState({ ...state, distance });

  const handleSubmit = () => {
    // set Redux filter state
    dispatch(setFilter(state));
    setActiveDialog(null);
  };

  const handleCancel = () => {
    // return local state to Redux state
    setState(filterState);
    setActiveDialog(null);
  };

  useEffect(() => {
    if (activeDialog === 'filter') toggleActive(true);
    else toggleActive(false);
  }, [activeDialog]);

  return (
    <DialogContainer
      title="Filter"
      isActive={isActive}
      setActiveDialog={setActiveDialog}
      handleButtonChange={handleButtonChange}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
    >
      <Form id="filterDialogForm">
        <BrandFilter />
        <fieldset>
          <legend>Time Of Day</legend>
          <div className="checkboxSection timeOfDaySection">
            {timeOfDayList.map((item, index) => {
              return (
                <Checkbox
                  key={index}
                  label={item.label}
                  subLabel={item.subLabel || null}
                  type="flex"
                  parent="timeOfDay"
                  child={item.child}
                  checked={state.timeOfDay[item.child]}
                  handleButtonChange={handleButtonChange}
                />
              );
            })}
          </div>
        </fieldset>
        {/* <fieldset>
          <legend>Refine Your Search</legend>
          <div className="checkboxSection refineSection">
            {refineList.map((item, index) => {
              return (
                <Checkbox
                  key={index}
                  label={item.label}
                  subLabel={item.subLabel || null}
                  type="flex"
                  parent="refine"
                  child={item.child}
                  checked={state.refine[item.child]}
                  handleButtonChange={handleButtonChange}
                />
              );
            })}
          </div>
        </fieldset> */}
        {/* <fieldset>
          <legend>Area</legend>
          <div className="checkboxSection areaSection">
            {areaList.map((item, index) => {
              return (
                <Checkbox
                  key={index}
                  label={item.label}
                  subLabel={item.subLabel || null}
                  type="grid"
                  parent="area"
                  child={item.child}
                />
              );
            })}
          </div>
        </fieldset> */}
        {/* <fieldset>
          <legend>Distance From Me</legend>
          <DistanceSlider
            distance={state.distance}
            handleDistanceChange={handleDistanceChange}
          />
        </fieldset> */}
      </Form>
    </DialogContainer>
  );
};

export default FiltersDialog;
