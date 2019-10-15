import React from 'react';
import PropTypes from 'prop-types';

const NotFound = ({ style }) => (
  <div style={style}>
    <h2>404 - Page Not Found</h2>
    <p>We are sorry but the page you are looking for does not exist.</p>
  </div>
);

NotFound.propTypes = {
  style: PropTypes.object,
};

export default NotFound;
