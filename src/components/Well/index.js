import React, { Component } from 'react';

import './styles.css';

class Well extends Component {
  render() {
    return (
      <div className="well-container">
        <div className="well-edge well-edge--top" />
        <div className="well-edge well-edge--bottom" />
        <div className="well-edge well-edge--left" />
        <div className="well-edge well-edge--right" />
        <div className="well">
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default Well;
