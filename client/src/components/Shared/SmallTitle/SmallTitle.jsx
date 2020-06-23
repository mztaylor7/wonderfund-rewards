import React from 'react';
import SmallTitle from './SmallTitle.style';

export default (props) => {
  const { uppercase, children } = props;
  return <SmallTitle uppercase={uppercase}>{children}</SmallTitle>;
};
