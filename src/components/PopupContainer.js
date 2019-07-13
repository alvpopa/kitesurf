import styled from 'styled-components';

const PopupContainer = styled.div`
  background-color: rgb(255, 255, 255, 0.9);
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.5);
  display: flex;
  text-align: center;
  flex-flow: column wrap;
  top: 2.25rem;
  position: absolute;
  justify-self: center;
  align-self: center;
  z-index: 9999;
`;

export default PopupContainer;
