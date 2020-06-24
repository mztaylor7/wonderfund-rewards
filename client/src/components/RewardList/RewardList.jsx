import React from 'react';
import SubHeading from '../Shared/SubHeading/SubHeading';
import RewardList from './RewarsList.style';

export default (props) => {
  const { id, activated, rewardItems } = props;

  if (!activated) {
    return (
      <>
        <SubHeading uppercase>Includes:</SubHeading>
        <RewardList>
          {rewardItems.split(',').map((item, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={`${id}_${item}-${i}`}>{item}</li>
          ))}
        </RewardList>
      </>
    );
  }

  /* Return a Fragment */
  return <></>;
};
