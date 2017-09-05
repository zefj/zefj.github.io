import React, { Component } from 'react';

import Card from '../../components/Card';

import './styles.css';

class Index extends Component {
  render() {
    return (
      <div className="index">
        <div className="index--content">
          <div className="index--greeting">Welcome to my part of the Internet</div>
          <p className="index--introduction">
            My name is Filip and I call myself a web developer. I like cars, trains and building stuff. I'm currently fully engaged in the development of Platforma iGabinet, a comprehensive tool for all sorts of medical practices.
          </p>
          {/* <p>
            What you're seeing is the next iteration of my personal webpage. The previous one was a way to show off the spectrum of my skills as widely as possible, and although being extremely proud of it, I came to a conclusion I don't actually need a blog. So I did this instead.
          </p> */}
        </div>

        <div className="index--cards">
          <div className="row">
            <div className="col-3">
              <Card>
                <Card.Header>
                  See what I did to get my engineering degree
                </Card.Header>
                <Card.Body>
                  For my engineering thesis, I built an automated guitar tuning system based on Raspberry Pi. This kickstarted my career.
                </Card.Body>
              </Card>
            </div>
          </div>     
        </div>
      </div>
    );
  }
}

export default Index;
