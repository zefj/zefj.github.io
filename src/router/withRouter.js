import React, { Component } from 'react';

import history from './history';

function withRouter(WrappedComponent) {
  return class extends Component {
    render() {
      return <WrappedComponent router={history} {...this.props} />;
    }
  };
}

export default withRouter;