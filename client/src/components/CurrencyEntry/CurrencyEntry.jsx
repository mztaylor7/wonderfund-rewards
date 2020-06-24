import React from 'react';
import { CurrencyBox, CurrencyIcon, Form, Input } from './CurrencyEntry.style';

const CurrencyEntry = (props) => {
  const { input, setInput } = props;

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <Form>
      <Input type='number' min='0' value={input} onChange={handleChange} />
      <CurrencyBox>
        <CurrencyIcon>$</CurrencyIcon>
      </CurrencyBox>
    </Form>
  );
};

export default CurrencyEntry;
