import axios from 'axios';

export const getRewards = () => {
  const currentAddress = window.location.href;
  const n = currentAddress.lastIndexOf('/');
  const queryParam = currentAddress.substring(n + 1);
  return axios.get(`http://localhost:3005/api/rewards`, {
    params: { projectId: queryParam },
  });
};
