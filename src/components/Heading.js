import styled from 'styled-components';

const Heading = styled.h1`
  font-family: 'Trocchi', serif;
  font-size: ${props => (props.forFilter ? '2rem' : '3rem')}
  font-weight: normal;
  margin: ${props => (props.forFilter ? '0.5rem' : '2rem')}
`;

export default Heading;
