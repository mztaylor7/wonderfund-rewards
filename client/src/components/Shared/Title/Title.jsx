import React from 'react';
import Title from './Title.style';

export default (props) => {
  const { uppercase, children } = props;
  return <Title uppercase={uppercase}>{children}</Title>;
};
