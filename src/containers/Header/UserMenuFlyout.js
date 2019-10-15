import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.scss';

const UserMenuFlyout = ({ onLogout, loggingOut }) => {
  const logoutText = loggingOut ? 'Logging Out ...' : 'Logout';
  return (
    <div className={styles['js-flyoutPanel']}>
      <ul className={styles['userMenu']} role="navigation" aria-label="alt menu">
        <li onClick={onLogout}>
          <span>
            <i className={styles['fa-sign-out']} /> {logoutText}
          </span>
        </li>
        <li>
          <span>
            <i className={styles['fa-refresh']} aria-hidden="true" />
            Flush Cache
          </span>
        </li>
      </ul>
    </div>
  );
};

UserMenuFlyout.propTypes = {
  onLogout: PropTypes.func.isRequired,
  loggingOut: PropTypes.bool.isRequired,
};

export default UserMenuFlyout;
