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

  return (
    <RewardBounds>
      <AvatarCard />
      <LargeTitle>Support</LargeTitle>
      <GradientCard />
      {rewards.map((reward) => (
        <Card key={reward.id} reward={reward} />
      ))}
    </RewardBounds>
  );
};

export default RewardViewer;
