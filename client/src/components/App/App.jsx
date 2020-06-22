/* Import Modules */
import React from 'react';

/* Import Theme Provider */
import Theme from '../Theme';
import { GlobalStyles } from './App.style';

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
      <GlobalStyles />
      <RewardViewer />
    </Theme>
  );
};

/* Export this module */
export default App;
