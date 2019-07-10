import { A } from 'hookrouter';
import styled from 'styled-components';

const Link = styled(A)`
  text-transform: uppercase;
  text-decoration: none;
  color: black;
  margin: 10px;
  :first-child {
    margin-right: auto;
  }
`;

export default Link;
