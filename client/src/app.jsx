import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom' //render some UI when a location matches the route's path
import App from './components/start.jsx';

//Rendering components to server/static/index.html
ReactDom.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
), document.getElementById('root'));