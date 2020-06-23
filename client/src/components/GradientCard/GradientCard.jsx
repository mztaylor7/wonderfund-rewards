/* Import Modules */
import React from 'react';
/* Import Components */
import Container from '../Shared/Container/Container';
import Heading from '../Shared/Heading/Heading';
import PledgeForm from '../PledgeForm/PledgeForm';
import GradientBox from './GradientCard.style';

/**
 * GradientCard Component
 * @returns {*}
 * @constructor
 */
const GradientCard = () => {
  /* Return the JSX to render */
  return (
    <Container activated>
      <Heading>Pledge without a reward</Heading>
      <PledgeForm activated>
        <GradientBox>
          <span>Back it because you believe in it.</span>
          <p>
            Support the project for no rewards, just because it speaks to you.
          </p>
        </GradientBox>
      </PledgeForm>
    </Container>
  );
};

/* Export the component - use the withTheme hook to allow theme access inside of this component */
export default GradientCard;
