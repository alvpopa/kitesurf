import styled from 'styled-components';

const Button = styled.button`
  display: ${props => (props.scaled ? 'inline-block' : 'block')};
  max-width: 150px;
  margin: ${props => (props.scaled ? '0 auto' : '2rem auto')};
  padding: 12px 20px;
  border-style: none;
  border-radius: 5px;
  background-color: #08c;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);
  font-size: 17px;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  outline: none;
  text-transform: uppercase;
  -webkit-appearance: none;
  disabled: ${props => (props.isSubmitting ? true : false)};
  transform: scale(${props => (props.scaled ? 0.5 : 1)});

  :disabled {
    opacity: 0.5;
    cursor: not-allowed !important;
  }
`;

export default Button;
