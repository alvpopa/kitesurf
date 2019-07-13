import { A } from 'hookrouter';
import styled from 'styled-components';

const Link = styled(A)`
  text-transform: uppercase;
  text-decoration: none;
  color: rgb(0, 0, 0, 0.9);
  margin: 0.5rem 1rem;
  :first-child {
    margin-right: auto;
    font-family: Calligraffitti, 'Trocchi', serif;
    color: #1a1a1a;
    letter-spacing: 0;
    text-transform: none;
    font-weight: 900;
  }
`;

export default Link;
