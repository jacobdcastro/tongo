import styled from 'styled-components';

const CategorySection = styled.section`
  margin: 30px 0 40px;
  height: auto;
  position: relative;

  .sectionHeader {
    display: flex;
    justify-content: space-between;
    h2 {
      font-weight: 700;
      font-size: 1.4rem;
    }
  }

  .scrollArea {
    position: relative;
    pointer-events: none;
    z-index: 0;
    .scrollBtns {
      position: absolute;
      z-index: 3;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      pointer-events: none;

      button {
        pointer-events: auto;
        background-color: ${props => props.theme.bg};
        border-radius: 50%;
        border: none;
        height: 35px;
        width: 35px;
        margin: 0;
        box-shadow: 1px 3px 6px #555;
        position: relative;
        z-index: 3;

        img {
          height: 80%;
          width: auto;
        }

        .next {
          transform: rotate(180deg);
        }
      }
      .scrollBack {
        margin-left: -10px;
      }
      .scrollForward {
        margin-right: -10px;
      }
    }
  }
  .exploreLinkContainer {
    display: relative;
    .exploreLink {
      color: ${props => props.theme.fg};
      color: ${props => props.theme.fg};
      padding: 4px;
      padding-left: 12px;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      position: relative;
      margin-top: 10px;
    }
  }

  @media (min-width: 768px) {
    margin-top: 40px;
    .exploreLink {
      display: absolute;
      right: 0;
      color: ${props => props.theme.fg};
    }
  }
`;

export default CategorySection;
