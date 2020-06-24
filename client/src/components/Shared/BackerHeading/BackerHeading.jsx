import React from 'react';
import BackerHeading from './BackerHeading.style';

export default (props) => {
  const { activated, uppercase, children } = props;
  return (
    <BackerHeading activated={activated} uppercase={uppercase}>
      {children}
    </BackerHeading>
  );
};
