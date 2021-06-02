import styled, { css } from 'styled-components';

interface PageContentProps {
  noPadding?: boolean;
  isMap?: boolean;
  isStaticPage?: boolean;
}

const PageContent = styled.main<PageContentProps>`
  height: auto;
  width: 100%;
  ${props => !props.isMap && 'max-width: 1440px'};
  ${props => props.isStaticPage && 'max-width: 1280px'};
  /* ${props => !props.isMap && 'max-width: 991px'}; */
  padding: ${props => (props.noPadding ? '0' : '0 17px')};
  margin: auto;

  .staticPageColumn {
    transition: 250ms;
  }

  ${props =>
    props.isStaticPage &&
    css`
      @media (min-width: 768px) {
        display: grid;
        grid-template-columns: calc(50% - 10px) calc(50% - 10px);
        grid-column-gap: 20px;

        .staticPageColumn {
          display: flex;
          flex-direction: column;
        }
      }

      @media (min-width: 1024px) {
        grid-template-columns: auto calc(475px - 5%);
        grid-column-gap: 5%;
      }

      /* @media (min-width: 1280px) {
    grid-column-gap: 75px;
  } */
    `};
`;

export default PageContent;
