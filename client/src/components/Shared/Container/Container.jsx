import React from 'react';
import Container from './Container.style';

export default (props) => {
  const { activated, padding } = props;
  const { children } = props;
  return (
    <Container activated={activated} padding={padding}>
      {children}
    </Container>
  );
};
