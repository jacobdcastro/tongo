import React, { useState, useEffect } from 'react';
import { VenueHours } from '../../../@types/apiTypes/xanoGeneral';
import { GreenHeading } from '../../general/headings';
import styled from 'styled-components';
import { createVenueHoursString, convertTimeString } from '../../../lib/dates';

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const HoursSection = styled.div<{ isExpanded: boolean }>`
  border-top: 1px solid ${props => props.theme.border};
  height: ${props => (props.isExpanded ? '180px' : '47px')};
  overflow: hidden;
  transition: 350ms;

  button {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    background-color: transparent;
    border: none;
    padding: 11px 15px;
    width: 100%;
    outline: none;

    .mainIcon {
      height: 24px;
      width: 24px;
      margin-right: 12px;
    }

    .hoursList {
      flex-grow: 2;
      .hoursText {
        font-weight: 500;
        font-size: 0.8rem;
        margin: 5px 0;
      }

      .singleTime {
        transition: 2000ms;
        ${props => props.isExpanded && 'display: none'};
      }

      .listTime {
        transition: 2000ms;
        ${props => !props.isExpanded && 'display: none'};
      }
    }

    .expandedArrow {
      transition: 300ms;
      transform: rotate(${props => (props.isExpanded ? '-180deg' : '0deg')});
    }
  }
`;

interface CardHoursProps {
  hours: VenueHours;
}

const CardHours = ({ hours }: CardHoursProps): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoursList, setHoursList] = useState([]);
  const _handleClick = () => setIsExpanded(!isExpanded);

  useEffect(() => {
    if (hours) {
      const list = [];
      daysOfWeek.forEach(day => {
        const obj = hours.find(item => item.day === day.toLowerCase());
        list.push({
          day,
          hours: obj
            ? `${convertTimeString(obj.open)} - ${convertTimeString(obj.close)}`
            : 'CLOSED',
        });
      });
      setHoursList([...list]);
    }
  }, [hours]);

  return (
    <HoursSection isExpanded={isExpanded}>
      <button onClick={_handleClick}>
        <img
          className="mainIcon"
          src={`/assets/locationCard/calendar.svg`}
          alt=""
        />

        <div className="hoursList">
          <GreenHeading headerType="h4" className="hoursText singleTime">
            {createVenueHoursString(hours)}
          </GreenHeading>
          <table>
            <tbody>
              {hoursList.map((day, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <GreenHeading
                        headerType="h4"
                        className="hoursText listTime"
                      >
                        {`${day.day}:`}
                      </GreenHeading>
                    </td>
                    <td>
                      <GreenHeading
                        headerType="h4"
                        className="hoursText listTime"
                      >
                        {`${day.hours}`}
                      </GreenHeading>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <img className="expandedArrow" src="/assets/icons/expand.svg" alt="" />
      </button>
    </HoursSection>
  );
};

export default CardHours;
