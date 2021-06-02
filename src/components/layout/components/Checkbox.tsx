import React from 'react';
import styled from 'styled-components';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

interface CheckboxDisplayStyledTypes {
  checked: boolean;
  type: 'grid' | 'flex';
}

const CheckboxDisplay = styled.span<CheckboxDisplayStyledTypes>`
  border: 1px solid
    ${props => (props.checked ? props.theme.green : props.theme.fg)};
  color: ${props => (props.checked ? props.theme.green : props.theme.fg)};
  height: ${props => (props.type === 'grid' ? '40px' : '56px')};
  width: ${props => (props.type === 'grid' ? '100%' : '30%')};
  margin: ${props => props.type === 'grid' && 'auto'};
  max-width: 80px;
  position: relative;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 160ms;

  .MuiSvgIcon-root {
    position: absolute;
    top: -2.5px;
    right: -2.5px;
    height: 15px;
    width: auto;
    opacity: ${props => (props.checked ? '1' : '0')};
    transition: 160ms;
  }

  .content {
    display: flex;
    flex-direction: column;
    text-align: center;

    span {
      font-weight: 600;
      font-size: 0.8rem;
    }
    small {
      font-size: 0.7rem;
    }
  }

  input[type='checkbox'] {
    position: absolute;
    left: 0;
    top: 0;
    background-color: blue;
    height: 100%;
    width: 100%;
    opacity: 0;
  }
`;

interface PropTypes {
  label: string;
  subLabel?: string;
  parent: 'timeOfDay' | 'refine' | 'area';
  child: string;
  type: 'grid' | 'flex';
  handleButtonChange: (parent: string, child: string) => void;
  checked: boolean;
}

const Checkbox = ({
  label,
  subLabel,
  parent,
  child,
  type,
  handleButtonChange,
  checked,
}: PropTypes): JSX.Element => {
  const id = `${label.toLowerCase()}_checked`;

  return (
    <CheckboxDisplay type={type} checked={checked}>
      <CheckCircleIcon style={{ color: '#2FE078' }} />
      <div className="content">
        <span>{label}</span>
        {subLabel && <small>{subLabel}</small>}
      </div>
      <label htmlFor={id} hidden>
        {label}
      </label>
      <input
        type="checkbox"
        name={label.toLowerCase()}
        id={id}
        value={label.toLowerCase()}
        checked={checked}
        onChange={() => handleButtonChange(parent, child)}
      />
    </CheckboxDisplay>
  );
};

export default Checkbox;
