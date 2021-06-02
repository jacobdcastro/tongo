import styled from 'styled-components';

const PageIntro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;

  .container {
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .time {
      font-size: 0.95rem;
      letter-spacing: 0;
    }

    .eventTitle {
      font-size: 1.54rem;
    }

    .introSubHead {
      position: relative;
      padding: 0;
      width: auto;
      flex-basis: content;

      /* Venue pages use h3 */
      h3 {
        font-size: 0.94rem;
        color: ${props => props.theme.fg};
      }

      /* Event pages use link */
      a,
      a:visited,
      a:active {
        font-size: 0.94rem;
        color: ${props => props.theme.fg};
        text-decoration: underline;

        .rightArrow {
          margin-bottom: -2px;
          margin-left: 2px;
          height: 14px;
          width: auto;
        }
      }
    }
  }
`;

export default PageIntro;
