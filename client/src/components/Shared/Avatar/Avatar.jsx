import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Avatar from './Avatar.style';
import { getUserImage } from '../../../services/apiService';

export default () => {
  const [img, setImg] = useState('');

  useEffect(() => {
    getUserImage().then((response) => {
      console.log('response.data: ', response.data);
      setImg(response.data);
    });
  }, []);

  return <Avatar>{ReactHtmlParser(img)}</Avatar>;
};
