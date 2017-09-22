import React, { Component } from 'react';

import View from '../../components/View';
import Card from '../../components/Card';

import withRouter from '../../router/withRouter';

import './styles.css';

class Index extends Component {
  render() {
    return (
      <View className="index">
          <div className="index--greeting">Welcome to my part of the Internet</div>
          <p>
            My name is Filip. I develop things for the web for a living. I like cars, trains and building stuff.
          </p>
          <p>
            What you see is my personal webpage, and although there isn't much content here, I encourage you to have a look around.
          </p>

        <div className="index--cards">
          <div className="row">
            <div className="col-3">
              <Card onClick={() => { this.props.router.push('/thesis') }}>
                <Card.Header>
                  See what I did to get my engineering degree
                </Card.Header>
                <Card.Body>
                  For my engineering thesis, I built an automated guitar tuning system based on Raspberry Pi. It's pretty cool despite its shortcomings, check it out.
                </Card.Body>
              </Card>
            </div>
          </div>     
        </div>
      </View>
    );
  }
}

export default withRouter(Index);
