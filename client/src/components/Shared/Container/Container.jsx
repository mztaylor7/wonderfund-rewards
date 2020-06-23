import React from 'react';
import Container from './Container.style';

export default (props) => {
  const { activated } = props;
  const { children } = props;
  return <Container activated={activated}>{children}</Container>;
};
