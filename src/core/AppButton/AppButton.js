import React from 'react';
import PropTypes from 'prop-types';

import styles from './appButton.module.scss';

const AppButton = ({ value, type, children, onClick }) => {
  return (
    <button onClick={onClick} type={type} className={styles.button}>
      {value || children}
    </button>
  );
};

AppButton.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  children: PropTypes.string,
  onClick: PropTypes.func,
};

export default AppButton;
