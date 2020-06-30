import axios from 'axios';

const getParams = () => {
  const currentAddress = window.location.href;
  const n = currentAddress.lastIndexOf('/');
  return currentAddress.substring(n + 1);
};

const removeParams = () => {
  const currentAddress = window.location.href;
  const n = currentAddress.lastIndexOf('/');
  return currentAddress.substring(0, n);
};

export const getRewards = () => {
  return axios.get(`${removeParams()}/api/rewards`, {
    params: { projectId: getParams() },
  });
};

export const getUserInfo = () => {
  return axios.get(`${removeParams()}}/api/projects/find`, {
    params: { id: getParams() },
  });
};

export const getUserImage = () => {
  return axios.get(`${removeParams()}/api/projects/user`, {
    params: { id: getParams() },
  });
};
