import React, { Component } from 'react';

import withRouter from '../../router/withRouter';
import PixelatedContainer from '../PixelatedContainer';

import './styles.css';

class BackButtonComponent extends Component {
  render() {
    const {
      router
    } = this.props;

    return (
      <div className="back-button" onClick={router.goBack}>
        <PixelatedContainer
          edges={['top', 'left']}
        >
          <i className="fa fa-arrow-left" />
        </PixelatedContainer>
      </div>
    );
  }
}

const BackButton = withRouter(BackButtonComponent);

function withBackButton(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <div>
          <BackButton />
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
}

export default withBackButton;
