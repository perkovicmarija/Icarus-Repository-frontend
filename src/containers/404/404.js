import React from 'react';

import { Link } from 'react-router-dom';

import Image from '../../assets/img/rob.png';

class FourZeroFour extends React.Component {
  render() {
    return (
      <div >
        <div>
          <h1>
            404
          </h1>
          <h3>
            Looks like you got lost
          </h3>
          <p>
            The page you are looking for doesn't exist or has been moved.
          </p>
          <button type="button">
            <Link to="/dashboard">
              BACK HOME
            </Link>
          </button>
        </div>

        <div >
          <img alt="#" src={Image} />
        </div>
      </div>
    );
  }
}

export default FourZeroFour;
