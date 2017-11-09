import React, { Component } from 'react';

import './styles.css';

class Post extends Component {
  render() {
    return (
      <div className="post">
        {this.props.children}
      </div>
    );
  }
}

const Title = (props) => <div className="post--title">{props.children}</div>;
const Body = (props) => <div className="post--body">{props.children}</div>;

Post.Title = Title;
Post.Body = Body;

export default Post;
