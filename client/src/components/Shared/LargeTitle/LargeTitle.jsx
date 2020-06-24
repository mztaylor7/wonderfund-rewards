import React from 'react';
import LargeTitle from './LargeTitle.style';

export default (props) => {
  const { uppercase, children } = props;
  return <LargeTitle uppercase={uppercase}>{children}</LargeTitle>;
};
