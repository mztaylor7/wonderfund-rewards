import React from 'react';
import Avatar from './Avatar.style';

export default () => {
  useEffect(() => {
    getRandomUserImage().then((response) => {
      setRewards(response.data);
    });
  }, []);
};
