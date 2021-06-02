import React from 'react';
import styled from 'styled-components';
import Section from './Section';
import { GreenHeading } from '../../general/headings';
import Paragraph from '../../general/Paragraph';
import { XanoVenue } from '../../../@types/apiTypes/venue';

const UpdateSection = styled.div`
  .updateSectionHeading {
    display: flex;
    flex-direction: row;

    small {
      font-size: 0.8rem;
      align-self: flex-end;
      margin-left: 11px;
      margin-bottom: 4px;
      color: ${props => props.theme.subHText};
    }
  }

  .servicesAvailable {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: center;
    margin: 12px auto 15px;

    li {
      display: flex;
      flex-direction: row;
      align-items: center;

      img {
        height: 25px;
        width: auto;
        margin-right: 3px;
      }
      .unavailable {
        margin-right: -2px;
      }
    }
  }
`;

const ServiceIcon = ({ is }: { is: boolean }): JSX.Element =>
  is ? (
    <img className="available" src="/assets/icons/done.svg" alt="available" />
  ) : (
    <img
      className="unavailable"
      src="/assets/icons/close.svg"
      alt="unavailable"
    />
  );

interface PropTypes {
  data: XanoVenue;
}

const CovidUpdate = ({ data }: PropTypes): JSX.Element => {
  const {
    customer_alert,
    dine_in,
    take_out,
    delivery,
    curbside_pickup,
    outdoor_seating,
  } = data;
  return (
    <Section>
      <UpdateSection>
        <div className="updateSectionHeading">
          <GreenHeading
            iconFilename="info.svg"
            iconAlt="iconFilename"
            headerType="h2"
          >
            COVID-19 UPDATE
          </GreenHeading>
          {/* <small>(Updated 7/01/2020)</small> */}
        </div>
        <ul className="servicesAvailable">
          {dine_in && (
            <li>
              <img
                className="available"
                src="/assets/icons/done.svg"
                alt="available"
              />
              Dine-in
            </li>
          )}
          {take_out && (
            <li>
              <img
                className="available"
                src="/assets/icons/done.svg"
                alt="available"
              />
              Takeout
            </li>
          )}
          {delivery && (
            <li>
              <img
                className="available"
                src="/assets/icons/done.svg"
                alt="available"
              />
              Delivery
            </li>
          )}
          {curbside_pickup && (
            <li>
              <img
                className="available"
                src="/assets/icons/done.svg"
                alt="available"
              />
              Curbside Pickup
            </li>
          )}
          {outdoor_seating && (
            <li>
              <img
                className="available"
                src="/assets/icons/done.svg"
                alt="available"
              />
              Outdoor Seating
            </li>
          )}
        </ul>
        <Paragraph content={customer_alert} />
      </UpdateSection>
    </Section>
  );
};

export default CovidUpdate;
