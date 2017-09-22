import React, { Component } from 'react';
import PropTypes from 'prop-types';

import invariant from 'invariant';

function withWellControl(WrappedComponent) {
  return class extends Component {
    static contextTypes = {
      well: PropTypes.object,
    };

    constructor(props, context) {
      super(props, context);
      invariant(
        context.well,
        'Could not find required `well` object. This HOC must be used with children of the Well component.'
      );
    }
    
    componentWillUnmount() {
      this.context.well.setDefaultSize();
    }

    render() {
      return <WrappedComponent well={ this.context.well } {...this.props} />;
    }
  };
}

export default withWellControl;