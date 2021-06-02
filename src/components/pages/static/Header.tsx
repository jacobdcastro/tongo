import React from 'react';
import styled from 'styled-components';
import { ShareButton, SaveButton } from '../../general/buttons';

const HeaderStyles = styled.div`
  position: relative;
  height: 275px;

  .staticHeroImage {
    position: absolute;
    object-fit: cover;
    z-index: 1;
    height: 100%;
    min-width: 100%;
    width: auto;
  }

  .iconSection {
    float: right;
    width: 80px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 25px 20px;
  }

  @media (min-width: 768px) {
    height: 350px;
  }
`;

interface PageHeaderPropTypes {
  imgSrc: string;
  imgAlt: string;
  imgTitle?: string;
}

const PageHeader = ({ imgSrc, imgAlt }: PageHeaderPropTypes): JSX.Element => {
  return (
    <HeaderStyles>
      <div>
        <img className="staticHeroImage" src={imgSrc} alt={imgAlt} />
      </div>
      <div className="iconSection">
        <ShareButton />
        <SaveButton handleClick={() => console.log('saved!')} />
      </div>
    </HeaderStyles>
  );
};

export default PageHeader;
