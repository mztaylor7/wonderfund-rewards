/* Import Modules */
import React from 'react';
/* Import Components */
import Container from '../Shared/Container/Container';
import Heading from '../Shared/Heading/Heading';

/**
 * Avatar Card Component
 * @returns {*}
 * @constructor
 */
const AvatarCard = () => {
  /* Return the JSX to render */
  return (
    <Container activated padding='5.2rem'>
      <Avatar />
      <Heading>Pledge without a reward</Heading>
    </Container>
  );
};

/* Export the component - use the withTheme hook to allow theme access inside of this component */
export default AvatarCard;
