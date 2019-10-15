import React from 'react';
import PropTypes from 'prop-types';

// import styles from './appText.module.scss';

const AppText = ({ children }) => {
  return <div>{children}</div>;
};

AppText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default AppText;
