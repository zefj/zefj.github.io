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

const Header = ({children, className}) => {
  return (
    <div className={classNames("card--header", className)}>
      { children }
    </div>
  );
}

const Body = ({children, className}) => {
  return (
    <p className={classNames("card--body", className)}>
      { children }
    </p>
  );
}

Card.Header = Header;
Card.Body = Body;
export default Card;