/* Import Modules */
import React from 'react';
import { Helmet } from 'react-helmet';

/* Import Theme Provider */
import Theme from '../Theme';
import GlobalStyles from './App.style';

/* Import Components */
import RewardViewer from '../RewardViewer/RewardViewer';

/**
 * App Component
 * @returns {*} JSX to be rendered to the page
 * @constructor
 */
const App = () => {
  return (
    <Theme>
      <Helmet>
        <meta charSet='UTF-8' />
        <meta
          name='viewport'
          content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
        />
        <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
        <link
          href='https://fonts.googleapis.com/css2?family=Muli:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
          rel='stylesheet'
        />
        <title>Document</title>
      </Helmet>
      <GlobalStyles />
      <RewardViewer />
    </Theme>
  );
};

/* Export this module */
export default App;
