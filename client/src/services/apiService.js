import axios from 'axios';

const getParams = () => {
  const currentAddress = window.location.href;
  const n = currentAddress.lastIndexOf('/');
  return currentAddress.substring(n + 1);
};

export const getRewards = () => {
  return axios.get(`http://localhost:3005/api/rewards`, {
    params: { projectId: getParams() },
  });
};

export const getUserImage = () => {
  return axios.get(`http://localhost:3005/api/projects/user`, {
    params: { id: getParams() },
  });
};
