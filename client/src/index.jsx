/* Import Modules */
import React from 'react';
import ReactDOM from 'react-dom';

/* Import Components */
import App from './components/App/App';
import configureStore from './store/configureStore';

/* Setup redux store */
const store = configureStore();

/* Render the App component to the screen */
ReactDOM.render(<App />, document.getElementById('root'));
