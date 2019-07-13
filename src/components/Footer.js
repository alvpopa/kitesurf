import styled from 'styled-components';

const Footer = styled.footer`
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  background: ${props => (props.isFavorite ? '#FF3B30' : '#E8B100')};
  text-transform: uppercase;
  cursor: pointer;
  padding: 0 0.5rem;
`;

export default Footer;
