import React from 'react';
import { CurrencyBox, Input, Form, CurrencyIcon } from './CurrencyEntry.style';

const CurrencyEntry = (props) => {
  const { input, setInput } = props;

  return (
    <Form>
      <Input
        type='number'
        min='0'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <CurrencyBox>
        <CurrencyIcon>$</CurrencyIcon>
      </CurrencyBox>
    </Form>
  );
};

export default CurrencyEntry;
