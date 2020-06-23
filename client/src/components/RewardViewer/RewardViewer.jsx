import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import apiService from '../../services/apiService';
import Container from '../Shared/Container/Container';

const RewardViewer = () => {
  const [rewards, setRewards] = useState([]);
  useEffect(() => {
    apiService().then((response) => {
      setRewards(response.data);
    });
  }, []);

  return (
    <>
      {rewards.map((reward) => (
        <Card key={reward.id} reward={reward} />
      ))}
    </>
  );
};

export default RewardViewer;
