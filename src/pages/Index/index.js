import React, { Component } from 'react';

import './styles.css';

class Index extends Component {
  render() {
    return (
      <div className="index--hello">
        frec.pl
        <div className="social">
            <a href="https://www.linkedin.com/in/FilipRec"><i className="fa fa-linkedin fa-2x" /></a>
            <a href="https://github.com/zefj"><i className="fa fa-github fa-2x" /></a>
            {/*<a href="https://www.facebook.com/naamioni"><i className="fa fa-facebook fa-2x" /></a>*/}
        </div>
{/*        <div className="index--notice">
          Under construction
        </div>*/}
      </div>
    );
  }
}

export default Index;
