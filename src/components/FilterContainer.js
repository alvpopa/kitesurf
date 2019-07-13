import styled from 'styled-components';

const FilterContainer = styled.div`
  background-color: rgb(255, 255, 255, 0.9);
  padding: 0 1rem;
  width: 15rem;
  height: 200px;
  position: absolute;
  top: 3rem;
  right: 2rem;
  display: flex;
  text-align: center;
  flex-flow: column wrap;
  align-self: flex-end;
  z-index: 9999;
`;

export default FilterContainer;
