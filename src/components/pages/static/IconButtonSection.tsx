import React, { useState } from 'react';
import styled from 'styled-components';
import { XanoCTAButton } from '../../../@types/apiTypes/xanoGeneral';
import {
  DirectionsButton,
  CallButton,
  TicketsButton,
} from '../../general/buttons';
import CTAButton from '../../general/buttons/CTAButton';
import Section from './Section';

const IconButtonSectionStyles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 0 10px;
  align-items: center;
`;

interface PropTypes {
  ctaButton?: XanoCTAButton | null;
  ctaButton2?: XanoCTAButton | null;
  call?: XanoCTAButton | null;
  directions?: XanoCTAButton | null;
}

const IconButtonSection = ({
  ctaButton,
  ctaButton2,
  call,
  directions,
}: PropTypes): JSX.Element => (
  <Section>
    <IconButtonSectionStyles>
      <CTAButton data={call} />
      <CTAButton data={directions} />
      <CTAButton data={ctaButton} />
      <CTAButton data={ctaButton2} />
    </IconButtonSectionStyles>
  </Section>
);

export default IconButtonSection;
