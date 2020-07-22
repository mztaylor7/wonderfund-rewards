import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Avatar from './Avatar.style';
import { getUserImage } from '../../../services/apiService';

export default () => {
  return <Avatar>{ReactHtmlParser(`<img src="https://gallery-module-deployment.s3.us-east-2.amazonaws.com/1.png" alt="user avatar"/>`)}</Avatar>;
};
