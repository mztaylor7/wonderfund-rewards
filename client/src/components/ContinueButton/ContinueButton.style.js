import styled from 'styled-components';

export default styled.button`
  width: 100%;
  background-color: #009e74;
  color: #ffffff;
  height: 4.2rem;
  padding: 0 1.8rem;
  font-size: 1.4rem;
  font-weight: 500;
  transition: all 0.25s ease-in-out !important;
  text-align: center;
  cursor: pointer;
  border: none;
  position: relative;
  display: inline-block;
  border-radius: 0;
  margin-top: 18px;

  &:hover:not(:disabled) {
    background-color: #037362;
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }
  
  &:focus {
    outline: 1px solid #282828;
    outline-offset: 2px;
    transition: outline 0.25s ease-in-out;
`;
