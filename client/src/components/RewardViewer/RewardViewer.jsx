import React, { useState } from 'react';
import Card from '../Card/Card';

import RewardBounds from './RewardViewer.style';
import GradientCard from '../GradientCard/GradientCard';
import LargeTitle from '../Shared/LargeTitle/LargeTitle';
import AvatarCard from '../AvatarCard/AvatarCard';

const RewardViewer = ({ getUserInfo }) => {
  const [rewards, setRewards] = useState([]);
  const [firstReward, setFirstReward] = useState({});
  React.useEffect(() => {
    getUserInfo().then((response) => {
      if (response.data.length > 0) {
        if (typeof response.data === 'string') {
          JSON.parse(response.data);
        }
        setRewards(response.data);
        setFirstReward(response.data[0]);
      }
    });
  }, []);

  // React.useEffect(() => {
  //   getRewards().then((response) => {
  //     setRewards(response.data);
  //   });
  // }, []);

  const renderCards = () => {
    return rewards.map((reward, i) => {
      const id = reward.id || i;
      return <Card key={`card_${id}`} reward={reward} />;
    });
  };

  return (
    <RewardBounds>
      <AvatarCard project={firstReward} />
      <LargeTitle>Support</LargeTitle>
      <GradientCard />
      {renderCards()}
    </RewardBounds>
  );
};

export default RewardViewer;
