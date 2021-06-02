import React from 'react';
import Section from './Section';
import { GreenHeading, PageHeading } from '../../general/headings';
import styled from 'styled-components';
import { BlackWideButton } from '../../general/buttons';
import { XanoOffer } from '../../../@types/apiTypes/offer';

const OfferSectionStyles = styled.div`
  .offerName {
    text-align: center;
    font-size: 1.3rem;
    font-weight: 700;
    margin: 19px auto;
  }
`;

interface PropTypes {
  toggleOfferDialog: React.Dispatch<React.SetStateAction<boolean>>;
  data: XanoOffer;
}

const OfferSection = ({ toggleOfferDialog, data }: PropTypes): JSX.Element => (
  <Section>
    <OfferSectionStyles>
      <GreenHeading
        headerType="h2"
        iconFilename="special.svg"
        iconAlt="special icon"
      >
        TONGO VIP EXPERIENCE
      </GreenHeading>
      <PageHeading className="offerName" headerType="h3" uppercase>
        {data.title}
      </PageHeading>
      <BlackWideButton onClick={() => toggleOfferDialog(true)} uppercase>
        REDEEM
      </BlackWideButton>
    </OfferSectionStyles>
  </Section>
);

export default OfferSection;
