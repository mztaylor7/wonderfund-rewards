/* Import Modules */
import React, { useState } from 'react';
/* Import Components */
import Container from '../Shared/Container/Container';
import Overlay from '../Shared/Overlay/Overlay';
import Heading from '../Shared/Heading/Heading';
import SubHeading from '../Shared/SubHeading/SubHeading';
import Title from '../Shared/Title/Title';
import Description from '../Shared/Description/Description';
import RewardList from '../RewardList/RewardList';
import SplitContainer from '../Shared/SplitContainer/SplitContainer';
import SmallTitle from '../Shared/SmallTitle/SmallTitle';
import BackerHeading from '../Shared/BackerHeading/BackerHeading';
import PledgeForm from '../PledgeForm/PledgeForm';

/**
 * Card Component
 * @param props
 * @returns {*}
 * @constructor
 */
const Card = (props) => {
  /* Use Hooks to create state component for the description container */
  const [descOpen, setDescOpen] = useState(false);
  const [activated, setActivated] = useState(false);

  const { reward } = props;
  const currencyConverted = Math.floor(reward.pledgeamount * 0.8);

  /* Return the JSX to render */
  return (
    <Container activated={activated}>
      <Overlay activated={activated} setActivated={setActivated} />
      <Heading>{`Pledge $${reward.pledgeamount} or more`}</Heading>
      <SubHeading uppercase>{`About £${currencyConverted}`}</SubHeading>
      <Title uppercase>{reward.title}</Title>
      <Description
        descOpen={descOpen}
        activated={activated}
        setDescOpen={setDescOpen}
        description={reward.description}
      />
      <RewardList id={reward.id} activated={activated} rewardItems={reward.rewarditems} />
      <SplitContainer>
        <div>
          <SubHeading uppercase>
            Estimated
            <br />
            delivery
          </SubHeading>
          <SmallTitle uppercase={false}>
            {`${reward.deliverymonth.substring(0, 3)} ${reward.deliveryyear}`}
          </SmallTitle>
        </div>
        <div>
          <SubHeading uppercase>Ships To</SubHeading>
          <SmallTitle uppercase={false}>Anywhere in the world</SmallTitle>
        </div>
      </SplitContainer>
      <BackerHeading activated={activated}>
        {`${reward.rewardquantity} Backers`}
      </BackerHeading>
      <PledgeForm activated={activated} />
    </Container>
  );
};

/* Export the component - use the withTheme hook to allow theme access inside of this component */
export default Card;
