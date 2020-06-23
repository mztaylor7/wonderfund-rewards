/* Import Modules */
import React, { useState } from 'react';
import { withTheme } from 'styled-components';
/* Import Components */
import ContinueButton from '../ContinueButton/ContinueButton';
import CurrencyEntry from '../CurrencyEntry/CurrencyEntry';
/* Import Styled Components */
import {
  BackerHeading,
  Container,
  DescCollapseBtn,
  DescriptionContainer,
  Heading,
  Overlay,
  RewardList,
  SmallTitle,
  SplitContainer,
  SubHeading,
  Title,
} from './Card.style';

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

  /* Destructure out the theme from props */
  const { theme } = props;

  /**
   * Render Pledge Form
   * Render the currency entry and continue button if the card is active
   * @returns {*} JSX to be rendered to the screen
   */
  const renderPledgeForm = () => {
    if (activated)
      return (
        <>
          <SubHeading
            uppercase={false}
            style={{ color: `${theme.colors.text}` }}
          >
            Pledge amount
          </SubHeading>
          <CurrencyEntry />
          <SubHeading uppercase>About $6</SubHeading>
          <ContinueButton />
        </>
      );

    /* Return a Fragment */
    return <></>;
  };

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

  /**
   * Render Reward List
   * Renders the list of rewards associated with the reward card
   * @returns {*} JSX to be rendered to the screen
   */
  const renderRewardsList = () => {
    if (!activated) {
      return (
        <>
          <SubHeading uppercase>Includes:</SubHeading>
          <RewardList>
            <li>Test</li>
          </RewardList>
        </>
      );
    }

    /* Return a Fragment */
    return <></>;
  };

  /**
   * Render Overlay
   * Render the green overlay over the card if the card is not active
   * @returns {*} JSX to be rendered to the screen
   */
  const renderOverlay = () => {
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

  /* Return the JSX to render */
  return (
    <>
      <Container activated={activated}>
        {renderOverlay()}
        <Heading>Pledge $5 or more</Heading>
        <SubHeading uppercase>About $6</SubHeading>
        <Title uppercase>High Five Pack</Title>
        <DescriptionContainer
          open={descOpen}
          activated={activated}
          onClick={() => setDescOpen(!descOpen)}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
            cupiditate et explicabo perferendis quis quod quos! Dicta fuga illum
            sunt tempore ut! Assumenda distinctio eius et eveniet illum in
            magnam.
          </p>
          <DescCollapseBtn open={descOpen}>
            {renderDescButton()}
          </DescCollapseBtn>
        </DescriptionContainer>
        {renderRewardsList()}
        <SplitContainer>
          <div>
            <SubHeading uppercase>
              Estimated
              <br />
              delivery
            </SubHeading>
            <SmallTitle uppercase={false}>Jul 2020</SmallTitle>
          </div>
          <div>
            <SubHeading uppercase>Ships To</SubHeading>
            <SmallTitle uppercase={false}>Anywhere in the world</SmallTitle>
          </div>
        </SplitContainer>
        <BackerHeading activated={activated}>19 Backers</BackerHeading>
        {renderPledgeForm()}
      </Container>
    </>
  );
};

/* Export the component - use the withTheme hook to allow theme access inside of this component */
export default withTheme(Card);
