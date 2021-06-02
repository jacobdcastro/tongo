import styled from 'styled-components';

interface CardProps {
  isFullWidth: boolean;
}

const Card = styled.div<CardProps>`
  flex-grow: 1;
  height: 270px;
  width: 100%;
  background-color: ${props => props.theme.bg};
  margin: ${props => (props.isFullWidth ? '15px 0 20px' : '0')};
  box-shadow: 2px 4px 10px #ddd;
  border-radius: 8px;
  position: relative;
  z-index: 2;
  pointer-events: auto;

  .image {
    position: relative;
    height: 70%;
    border-radius: 8px 8px 0 0;

    .cardIcons {
      position: absolute;
      z-index: 3;
      top: 0;
      left: 0;
      width: 100%;
      margin: 0;
      padding: 12px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .typeLabel {
        border-radius: 4px;
        background-color: ${props => props.theme.bg};
        padding: 7px;
        color: ${props => props.theme.hText};
        letter-spacing: 0.5px;
        font-size: 0.75rem;
        font-weight: 700;
      }
    }

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
      border-radius: 8px 8px 0 0;
    }

    .cardHeroImg {
      border-radius: 8px 8px 0 0;
      position: absolute;
      object-fit: cover;
      height: 100%;
      min-width: 100%;
      width: auto;
    }
  }

  .info {
    position: relative;
    height: 30%;
    padding: 8px;
    .time {
      color: ${props => props.theme.green};
      font-weight: 600;
      font-size: 0.868rem;
      padding: 3px 0;
      text-overflow: ellipsis;
      overflow-x: hidden;
      white-space: nowrap;
    }
    h3 {
      font-size: 1.1rem;
      font-weight: 700;
      padding: 3px 0;
      color: ${props => props.theme.hText};
      text-overflow: ellipsis;
      overflow-x: hidden;
      white-space: nowrap;
    }

    h4 {
      // ! TEMPORARY until location services are added
      /* width: calc(100% - 49px); */
      width: calc(100%);
      text-overflow: ellipsis;
      overflow-x: hidden;
      white-space: nowrap;
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

export default Card;
