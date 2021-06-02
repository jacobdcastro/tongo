import styled from 'styled-components';

const FilterBtn = styled.button`
  color: ${props => props.theme.green};
  border: 1px solid ${props => props.theme.green};
  border-radius: 30px;
  padding: 10px 14px;
  margin-right: 14px;
  background: ${props => props.theme.bg};
  font-size: 0.95rem;

  @media (min-width: 768px) {
    height: 40px;
    margin-right: 9px;
    margin-left: 4px;
  }
`;

export default FilterBtn;
