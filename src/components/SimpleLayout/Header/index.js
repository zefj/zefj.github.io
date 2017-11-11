import React, { Component } from 'react';

import styles from './styles.css';

class Header extends Component {
  render() {
    return (
        <div className="simple-header">
            <a href="https://frec.pl">
                <span className="simple-header--home">frec.pl</span>
            </a>
        </div>
    );
  }
}

export default Header;
