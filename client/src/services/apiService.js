import axios from 'axios';
const serverAddr =
  'http://ec2-18-216-10-147.us-east-2.compute.amazonaws.com:3005';
const getParams = () => {
  const currentAddress = window.location.href;
  const n = currentAddress.lastIndexOf('/');
  return currentAddress.substring(n + 1);
};

export const getRewards = () => {
  return axios.get(`${serverAddr}/api/rewards`, {
    params: { projectId: getParams() },
  });
};

export const getUserInfo = () => {
  return axios.get(`${serverAddr}}/api/projects/find`, {
    params: { id: getParams() },
  });
};

export const getUserImage = () => {
  return axios.get(`${serverAddr}/api/projects/user`, {
    params: { id: getParams() },
  });
};
