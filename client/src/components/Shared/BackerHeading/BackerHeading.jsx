import React from 'react';
import BackerHeading from './BackerHeading.style';

export default (props) => {
  const { activated, children } = props;
  return <BackerHeading activated={activated}>{children}</BackerHeading>;
};
