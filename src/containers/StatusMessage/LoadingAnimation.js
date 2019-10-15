import React from 'react';
import PropTypes from 'prop-types';

import styles from './loadingAnimation.module.scss';
const LoadingAnimation = () => {
  return (
    <span className={styles.loadingAnimation}>
      {[...Array(5)].map((v, i) => (
        <span key={i} />
      ))}
    </span>
  );
};

LoadingAnimation.propTypes = {
  turn: PropTypes.number,
  animationDuration: PropTypes.number,
};

export default LoadingAnimation;
