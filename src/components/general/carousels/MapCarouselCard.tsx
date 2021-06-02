import React from 'react';
import styled from 'styled-components';
import { Event } from '../../../@types/EventData';
import Link from 'next/link';
import { XanoListing } from '../../../@types/apiTypes/listing';

const Card = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  height: 120px;
  width: 100%;
  background-color: ${props => props.theme.bg};
  margin: 0;
  box-shadow: 2px 4px 10px #444;
  border-radius: 8px;

  .image {
    position: relative;
    height: 100%;
    width: 40%;
    object-fit: cover;

    .overlay {
      z-index: 2;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.05);
    }

    img {
      border-radius: 8px 0 0 8px;
      position: absolute;
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }

  .info {
    position: relative;
    height: 30%;
    padding: 8px;
    .time {
      color: ${props => props.theme.green};
      font-weight: 600;
      font-size: 0.9rem;
      padding: 3px 0;
    }
    h3 {
      font-size: 1.1rem;
      font-weight: 700;
      padding: 3px 0;
      color: ${props => props.theme.hText};
    }

    h4 {
      font-weight: 500;
      padding: 3px 0;
      color: ${props => props.theme.subHText};
    }
    .location {
      position: absolute;
      bottom: 5px;
      right: 5px;
      font-size: 0.7rem;
      display: flex;
      align-items: center;
      padding: 3px;
      color: ${props => props.theme.subHText};

      .MuiSvgIcon-root {
        color: ${props => props.theme.subHText};
        height: 15px;
        width: 15px;
      }
    }
  }
`;

interface PropTypes {
  data: XanoListing;
}

const MapCarouselCard = ({ data }: PropTypes): JSX.Element => {
  return (
    <Link href={`/events/${data.id}`}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a>
        <Card>
          <div className="image">
            <span className="overlay" />
            <img src="/assets/heroImg/image1.png" alt="santa barbara" />
          </div>

          <div className="info">
            <p className="time">TOMORROW</p>
            <h3>{data.title}</h3>
            <h4>{data._venue.name}</h4>
          </div>
        </Card>
      </a>
    </Link>
  );
};

export default MapCarouselCard;
