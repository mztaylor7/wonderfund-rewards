import React from 'react';
import Overlay from './Overlay.style';

export default (props) => {
  const { activated, setActivated } = props;
  if (!activated) {
    return (
      <Overlay onClick={() => setActivated(!activated)}>
        <p>Select this reward</p>
      </Overlay>
    );
  }

  /* Return a Fragment */
  return <></>;
};
