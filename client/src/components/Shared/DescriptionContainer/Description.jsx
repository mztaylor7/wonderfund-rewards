import React from 'react';
import { DescCollapseBtn, DescriptionContainer } from './Description.style';

const Description = (props) => {
  const { description, descOpen, activated, setDescOpen } = props;

  /**
   * Render Description Button
   * Renders the 'Read more...' or 'Less' button depending on if the description box is open or collapsed
   * @returns {string|*}
   */
  const renderDescButton = () => {
    if (activated) {
      return descOpen ? 'Less' : 'Read more...';
    }

    /* Return a Fragment */
    return <></>;
  };

  return (
    <DescriptionContainer open={descOpen} activated={activated}>
      <p>{description}</p>
      <DescCollapseBtn onClick={() => setDescOpen(!descOpen)} open={descOpen}>
        {renderDescButton()}
      </DescCollapseBtn>
    </DescriptionContainer>
  );
};

export default Description;
