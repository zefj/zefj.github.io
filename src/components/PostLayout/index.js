import React, { Component } from 'react';

import Header from './Header';

import './styles.css';

class PostLayout extends Component {
  render() {
    return (
      <div className="simple--container">
        <Header />
        <div className="simple--content">
            { this.props.children }
        </div>
      </div>
    );
  }
}

export default PostLayout;
