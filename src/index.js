import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import registerServiceWorker from './registerServiceWorker';

import history from './router/history';
import router from './router/router';
import routes from './router/routes';

const container = document.getElementById('root');

function renderComponent(component) {
  ReactDOM.render(component, container);
}

function render(location) {
  router.resolve(routes, location)
    .then(renderComponent)
    .catch(error => {
      router.resolve(routes, { ...location, error })
        .then(renderComponent)
  });
}

history.listen(render);
render(history.location);
