import React, { Component } from 'react';

import Card from '../../components/Card';

import './styles.css';

class Index extends Component {
  render() {
    return (
      <div className="index">
        <p className="index--greeting">Welcome to my part of the Internet</p>
        <section className="index--introduction">
          My name is Filip and I call myself a web developer. I like cars, trains and building stuff. I'm currently fully engaged in the development of Platforma iGabinet, a comprehensive tool for all sorts of medical practices.
        </section>

        <section>
          What you're seeing is the next iteration of my personal webpage. The previous one was a way to show off the spectrum of my skills as widely as possible, and although being extremely proud of it, I came to a conclusion I don't actually need a blog. So I did this instead.
        </section>

        <div className="index--cards row">
          <div className="col-1">
            <Card />
          </div>
          <div className="col-1">
            <Card />
          </div>
          <div className="col-1">
            <Card />
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
