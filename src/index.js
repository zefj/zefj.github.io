import ReactDOM from 'react-dom';
import './index.css';

import router from './router/router';
import routes from './router/routes';

/**
 * This simulates the behaviour of GitHub pages, which do not support client-side routing.
 * An explanation of this snippet is in public/404.html.
 */
const simulateGhPages404 = () => {
    var l = window.location;
    l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        '/#/' +
        l.pathname.slice(1) +
        l.search +
        l.hash
    );
};

const start = () => {
    if (process.env.NODE_ENV === 'development' && window.location.pathname !== '/') {
        return simulateGhPages404();
    }

    // Instantiating the history messes with the url, so we do it here to avoid broken paths
    // on development environment.
    const history = require('./router/history').default;

    const render = (location) => {
        const container = document.getElementById('root');

        router.resolve(routes, location)
            .then((component) => ReactDOM.render(component, container))
            .catch(error => {
                console.error(error.stack);
                history.push('/');
            });
    };

    history.listen(render);
    return render(history.location);
};

start();
