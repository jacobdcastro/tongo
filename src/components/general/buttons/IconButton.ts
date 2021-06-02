import styled from 'styled-components';

const IconButton = styled.div`
  text-align: center;
  width: 68px;

  a {
    display: flex;
    flex-direction: column;
    align-items: center;

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      height: 40px;
      width: 40px;
      margin-bottom: 5px;
    }

    span {
      color: ${props => props.theme.green};
      font-weight: 600;
      font-size: 0.8rem;
      margin-top: 6px;
    }
  }
`;

export default IconButton;
