import React, { Component } from 'react';
import classNames from 'classnames';

import './styles.css';

class View extends Component {
  render() {
    return (
      <div className={classNames("view", this.props.className)}>
        { this.props.children }
      </div>
    );
  }
}

export default View;
