import { A } from 'hookrouter';
import styled from 'styled-components';

const Link = styled(A)`
  text-transform: uppercase;
  text-decoration: none;
  color: rgb(0, 0, 0, 0.9);
  margin: 10px;
  :first-child {
    margin-right: auto;
  }
`;

export default Link;
