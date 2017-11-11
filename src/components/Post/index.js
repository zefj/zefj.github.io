import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import hljs from 'highlight.js';

import 'highlight.js/styles/zenburn.css';
import './styles.css';

class Post extends Component {
  componentDidMount() {
    this.highlightCode();
    this.loadDisqus();
  }
  
  highlightCode() {
    const domNode = ReactDOM.findDOMNode(this);
    const nodes = domNode.querySelectorAll('pre code');

    let i;
    for (i = 0; i < nodes.length; i++) {
        hljs.highlightBlock(nodes[i]); 
    }
  }

  loadDisqus() {
    window.disqus_config = function () {
      this.page.url = `https://frec.pl/${window.location.pathname}`;
      this.page.identifier = window.location.pathname;
      this.page.title = document.title;
    };

    const child = this.disqus = document.createElement('script');
    const parent = document.getElementsByTagName('head')[0] ||
                 document.getElementsByTagName('body')[0];

    child.async = true;
    // @TODO: development shortname
    child.type = 'text/javascript';
    child.src = '//zefplayground.disqus.com/embed.js';

    parent.appendChild(child);
  }

  render() {
    return (
      <div className="post">
        {this.props.children}
        <div id="disqus_thread"></div>
      </div>
    );
  }
}

const Title = (props) => <div className="post--title">{props.children}</div>;
const Body = (props) => <div className="post--body">{props.children}</div>;

Post.Title = Title;
Post.Body = Body;

export default Post;
