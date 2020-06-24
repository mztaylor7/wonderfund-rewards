import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import { getRewards } from '../../services/apiService';
import RewardBounds from './RewardViewer.style';
import GradientCard from '../GradientCard/GradientCard';
import LargeTitle from '../Shared/LargeTitle/LargeTitle';
import AvatarCard from '../AvatarCard/AvatarCard';

const RewardViewer = () => {
  const [rewards, setRewards] = useState([]);
  useEffect(() => {
    getRewards().then((response) => {
      setRewards(response.data);
    });
  }, []);

  const renderCards = () => {
    return rewards.map((reward) => <Card key={reward.id} reward={reward} />);
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
