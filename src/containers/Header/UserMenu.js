import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserMenuFlyout from './UserMenuFlyout';
import styles from './Header.module.scss';

class UserMenu extends Component {
  state = { dropdown: false };
  toggleDropdown = this.toggleDropdown.bind(this);
  onLogout = this.onLogout.bind(this);

  toggleDropdown() {
    this.setState({
      dropdown: !this.state.dropdown,
      loggingOut: false,
    });
  }

  onLogout() {
    this.setState({ loggingOut: true });
    this.props.logout();
  }

  render() {
    const {
      user: { displayName, userImage },
    } = this.props;

    return (
      <div className={styles.userInfo}>
        <span className={styles.user} tabIndex="0" onClick={this.toggleDropdown}>
          <span className={styles.name}>{displayName}</span>
          <span className={`${styles.icon} ${styles.userIcon}`}>
            <img src={userImage} alt="Profile" />
          </span>
        </span>

        {this.state.dropdown && (
          <UserMenuFlyout loggingOut={this.state.loggingOut} onLogout={this.onLogout} />
        )}
      </div>
    );
  }
}

UserMenu.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default UserMenu;
