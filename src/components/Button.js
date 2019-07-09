import styled from 'styled-components';

const Button = styled.button`
  max-width: 150px;
  margin: 20px auto;
  display: inline-block;
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
  -webkit-appearance: none;
  disabled: ${props => (props.isSubmitting ? true : false)};

  :disabled {
    opacity: 0.5;
    cursor: not-allowed !important;
  }
`;

export default Button;
