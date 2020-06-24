import React, { useState } from 'react';
import { withTheme } from 'styled-components';
import SubHeading from '../Shared/SubHeading/SubHeading';
import CurrencyEntry from '../CurrencyEntry/CurrencyEntry';
import ContinueButton from '../ContinueButton/ContinueButton';

export default withTheme((props) => {
  const { activated, children } = props;
  const { theme } = props;

  const [input, setInput] = useState('');

  if (activated) {
    return (
      <>
        <SubHeading uppercase={false} style={{ color: `${theme.colors.text}` }}>
          Pledge amount
        </SubHeading>
        <CurrencyEntry input={input} setInput={setInput} />
        <SubHeading uppercase>{`About £${Math.round(input * 0.8)}`}</SubHeading>
        {children}
        <ContinueButton />
      </>
    );
  }

  /* Return a Fragment */
  return <></>;
});
