import React from 'react';
import Overlay from './Overlay.style';

export default (props) => {
  const { activated, setActivated } = props;

  const handleOverlayClick = () => {
    setActivated(!activated);
  };

  if (!activated) {
    return (
      <Overlay onClick={handleOverlayClick}>
        <p>Select this reward</p>
      </Overlay>
    );
  }

  /* Return a Fragment */
  return <></>;
};
