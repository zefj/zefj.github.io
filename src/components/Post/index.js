import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import hljs from 'highlight.js';

import 'highlight.js/styles/zenburn.css';
import './styles.css';

class Post extends Component {
  componentDidMount() {
    const domNode = ReactDOM.findDOMNode(this);
    const nodes = domNode.querySelectorAll('pre code');

    let i;
    for (i = 0; i < nodes.length; i++) {
        hljs.highlightBlock(nodes[i]); 
    }
  }
  
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
