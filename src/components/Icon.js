import styled from 'styled-components';

const Icon = styled.i`
  display: flex;
  align-self: ${props => (props.isClose ? 'flex-end' : 'flex-start')};
  margin-left: ${props => (props.isClose ? 'auto' : '')};
  text-transform: uppercase;
  padding: ${props =>
    props.isDelete ? '0.5rem 0 0 0.5rem' : '0.5rem 0.5rem 0 0.5rem'};
`;

export default Icon;
