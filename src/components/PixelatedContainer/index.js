import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import classNames from 'classnames';

import './styles.css';

class PixelatedContainer extends Component {
  static propTypes = {
    edges: PropTypes.array,
  };

  static defaultProps = {
    edges: ['left', 'top', 'right', 'bottom'],
  };

  render() {
    return (
      <div className="pixelated">
        {
          _.map(this.props.edges, (edge) => {
            return <div key={`edge-${edge}`} className={`pixelated-edge pixelated-edge--${edge}`} />
          })
        }

        <div className="pixelated-content" >
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default PixelatedContainer;
