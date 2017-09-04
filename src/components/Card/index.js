import React, { Component } from 'react';
import classNames from 'classnames';

import './styles.css';

class Card extends Component {
  render() {
    const {
      children,
      className
    } = this.props;

    return (
      <div className={classNames("card", className)}>
        { children }
      </div>
    );
  }
}

export default Card;
