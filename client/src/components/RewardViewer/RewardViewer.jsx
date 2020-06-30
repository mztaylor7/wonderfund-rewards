import React, { useState } from 'react';
import Card from '../Card/Card';

import RewardBounds from './RewardViewer.style';
import GradientCard from '../GradientCard/GradientCard';
import LargeTitle from '../Shared/LargeTitle/LargeTitle';
import AvatarCard from '../AvatarCard/AvatarCard';

const RewardViewer = ({ getRewards }) => {
  const [rewards, setRewards] = useState([]);
  React.useEffect(() => {
    getRewards().then((response) => {
      setRewards(response.data);
    });
  }, []);

  const renderCards = () => {
    return rewards.map((reward) => (
      <Card key={`card_${rewards.id}`} reward={reward} />
    ));
  };

  return (
    <RewardBounds>
      <AvatarCard />
      <LargeTitle>Support</LargeTitle>
      <GradientCard />
      {renderCards()}
    </RewardBounds>
  );
};

export default RewardViewer;
