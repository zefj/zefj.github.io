import React, { Component } from 'react';

import View from '../../components/View';
import Card from '../../components/Card';

import withRouter from '../../router/withRouter';

import './styles.css';

class Index extends Component {
  render() {
    return (
      <View className="index">
          <div className="index--greeting">Welcome to my playground</div>
          <p>
            My name is Filip. I make things for the web for a living.
          </p>
          <p>
            I like cars, trains and building stuff. I believe there is nothing you cannot learn, it's just that some things are significantly harder to grasp. Like CSS - way harder than, for example, orbital mechanics. I'd like to learn the latter at one point, so I can proceed with nuking CSS from orbit.
          </p>
          <p>
            What you see is my personal webpage. Over time I shifted it from being a resume to a small playground with close to zero reasons to even exist. There isn't much content here, but I encourage you to have a look around anyway.
          </p>

        <div className="index--cards">
          <div className="row">
            <div className="col-3">
              <Card onClick={() => { this.props.router.push('/thesis') }}>
                <Card.Body>
                  Check out my Raspberry Pi guitar tuner here
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
