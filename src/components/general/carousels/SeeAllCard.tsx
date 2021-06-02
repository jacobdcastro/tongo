import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { ArrowRightCircle } from 'react-feather';

const Card = styled.div`
  flex-grow: 1;
  height: 270px;
  width: 100%;
  background-color: ${props => props.theme.bg};
  margin: 0;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 2px 4px 10px #ddd;

  span {
    color: ${props => props.theme.fg};
    font-weight: 400;
    font-size: 1.6rem;
    margin-bottom: 20px;
  }

  .arrowIcon {
    height: 50px;
    width: auto;
    color: ${props => props.theme.fg};
  }
`;

interface PropTypes {
  path: { pathname: string; query?: { item: number } };
}

const SeeAllCard = ({ path }: PropTypes): JSX.Element => (
  <div draggable={false} style={{ pointerEvents: 'auto' }}>
    <Link href={path}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a>
        <Card>
          <span>
            SEE
            <br />
            MORE
          </span>
          <ArrowRightCircle className="arrowIcon" strokeWidth={1} />
        </Card>
      </a>
    </Link>
  </div>
);

export default SeeAllCard;
