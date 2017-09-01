import React from 'react';
import { render } from 'react-dom';
import Fourbyfour from './components/Fourbyfour';
import './assets/images/favicon.ico';

import styles from './style/application.scss';

render(
  <Fourbyfour />,
  document.getElementById('root')
);
