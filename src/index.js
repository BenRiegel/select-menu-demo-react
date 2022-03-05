//----- imports ----------------------------------------------------------------

import React from 'react';
import ReactDOM from 'react-dom';
import App from './view/components/App.js';
import './view/stylesheets/index.css';


//----- module code block ------------------------------------------------------

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
