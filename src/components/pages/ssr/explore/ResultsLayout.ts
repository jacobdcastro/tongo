import styled from 'styled-components';

const ResultsLayout = styled.div`
  @media (min-width: 550px) {
    display: grid;
    grid-template-columns: calc(50% - 13px) calc(50% - 13px);
    grid-gap: 0px 26px;
  }

  @media (min-width: 924px) {
    grid-template-columns: calc(33% - 13px) calc(33% - 13px) calc(33% - 17px);
  }

  @media (min-width: 1280px) {
    grid-template-columns: calc(25% - 19px) calc(25% - 19px) calc(25% - 19px) calc(
        25% - 19px
      );
  }
`;

export default ResultsLayout;
