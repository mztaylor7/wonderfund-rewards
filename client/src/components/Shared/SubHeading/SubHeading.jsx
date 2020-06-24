import React from 'react';
import SubHeading from './SubHeading.style';

export default (props) => {
  const { uppercase, children } = props;
  return <SubHeading uppercase={uppercase}>{children}</SubHeading>;
};
