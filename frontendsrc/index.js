import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import './assets/images/favicon.ico';

import styles from './style/application.scss';

render(
  <App />,
  document.getElementById('root')
);
