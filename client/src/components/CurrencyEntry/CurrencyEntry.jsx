import React from 'react';
import { CurrencyBox, Input, Form, CurrencyIcon } from './CurrencyEntry.style';

const CurrencyEntry = (props) => {
  return (
    <Form>
      <Input />
      <CurrencyBox>
        <CurrencyIcon>$</CurrencyIcon>
      </CurrencyBox>
    </Form>
  );
};

export default CurrencyEntry;
