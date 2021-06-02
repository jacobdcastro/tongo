import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import styled from 'styled-components';
import DialogContainer from './DialogContainer';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Dialog } from '../../../@types/dialogs';
import { useDispatch } from 'react-redux';
import { locations } from '../../../../data/locations';
import { setLocation } from '../../../redux/actions/location';
import { LocationState } from '../../../redux/reducers/location';

interface PropTypes {
  activeDialog: Dialog;
  setActiveDialog: Dispatch<SetStateAction<Dialog>>;
}

const LocationDialogSection = styled.ul`
  li {
    padding: 7px 15px;
    display: flex;
    flex-direction: row;
    align-items: center;

    &:hover {
      background-color: ${props => props.theme.border};
    }

    span {
      margin-left: 10px;
    }
  }
`;

const LocationDialog = ({
  activeDialog,
  setActiveDialog,
}: PropTypes): JSX.Element => {
  const [isActive, toggleActive] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeDialog === 'location') toggleActive(true);
    else toggleActive(false);
  }, [activeDialog]);

  const handleLocationSelect = (location: LocationState) => {
    // 1. set location in Redux store
    dispatch(setLocation(location));

    // 2. close dialog when complete
    setActiveDialog(null);
  };

  return (
    <DialogContainer
      title="Location"
      isActive={isActive}
      setActiveDialog={setActiveDialog}
    >
      <LocationDialogSection>
        {locations.map((location: LocationState, index: number) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <li key={index} onClick={() => handleLocationSelect(location)}>
            <LocationOnIcon />
            <span>{location.city}</span>
          </li>
        ))}
      </LocationDialogSection>
    </DialogContainer>
  );
};

export default LocationDialog;
