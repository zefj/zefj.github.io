import React, { Component } from 'react';

import './styles.css';

class PlainTextLayout extends Component {
  render() {
    return (
        <div className="plain-text--content">
            { this.props.children }
        </div>
    );
  }
}

export default PlainTextLayout;
