import ReactDOM from 'react-dom';
import './index.css';

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
      console.error(error.stack);
      history.push('/');
  });
}

history.listen(render);
render(history.location);
