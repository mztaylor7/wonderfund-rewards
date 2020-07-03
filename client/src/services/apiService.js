import axios from 'axios';

const getParams = () => {
  const currentAddress = window.location.href;
  const n = currentAddress.lastIndexOf('/');
  return currentAddress.substring(n + 1);
};

export const getRewards = () => {
  return axios.get(`/api/rewards`, {
    params: { projectId: getParams() },
  });
};

export const getUserInfo = () => {
  return axios.get(`/api/projects/find`, {
    params: { id: getParams() },
  });
};

export const getUserImage = () => {
  return axios.get(`/api/projects/user`, {
    params: { id: getParams() },
  });
};
