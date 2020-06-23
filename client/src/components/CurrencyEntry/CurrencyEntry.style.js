import styled from 'styled-components';

export const Form = styled.div`
  position: relative;
  margin: 10px 0;
`;

export const CurrencyIcon = styled.span`
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  font-size: 1.2rem;
  white-space: nowrap;
  width: 4.2rem;
`;

export const CurrencyBox = styled.div`
  transition: all 300ms cubic-bezier(0.175, 0.885, 0.335, 1);
  height: 100%;
  position: absolute;
  border-right: 1px solid #dcdedd;
  top: 0;
  left: 0;
  display: inline-flex;
  align-items: center;
  pointer-events: none;
  color: #656969;
  z-index: 2;
`;

export const Input = styled.input`
  border: 1px solid #dcdedd;
  color: #282828;
  cursor: default;
  padding: 10px;
  padding-left: 5.4rem;
  position: relative;
  height: 42px;
  line-height: 20px;
  box-sizing: border-box;
  width: 100%;
  transition: all 300ms cubic-bezier(0.175, 0.885, 0.335, 1);
  text-rendering: auto;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  font: 400 13.3333px Arial;
  writing-mode: horizontal-tb;
  -webkit-rtl-ordering: logical;

  &:focus {
    outline: 0;
    border-color: #009e74;
    box-shadow: #f8f9fd 0 0 5px;

    & + div {
      border-color: #009e74;
    }
  }
`;
