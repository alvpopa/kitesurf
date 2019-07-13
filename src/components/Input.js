import styled from 'styled-components';

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  width: 20%;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
  min-width: 10rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  :focus {
    border-color: #007eff;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 0 3px rgba(0, 126, 255, 0.1);
    outline: none;
  }
`;

export default Input;
