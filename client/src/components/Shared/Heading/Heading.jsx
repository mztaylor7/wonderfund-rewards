import React from 'react';
import Heading from './Heading.style';

export default ({ heavy, children }) => {
  return <Heading heavy={heavy}>{children}</Heading>;
};
