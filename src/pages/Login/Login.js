import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Subscribe } from "unstated";

import MainStore from "../../stores/MainStore";
import LoginForm from "./LoginForm";
import { SUBDIRECTORY } from "../../utils/config";

import styles from "./login.module.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  render() {
    return (
      <Subscribe to={[MainStore]}>
        {({
          auth: { login, reauthLogin },
          state: {
            auth: { loading, isAuthenticated, isReauthRequired, user }
          }
        }) => {
          if (isAuthenticated && !isReauthRequired) {
            return <Redirect to={`${SUBDIRECTORY}/`} />;
          }
          return (
            <div className={styles.login} style={this.props.style}>
              <LoginForm
                validate={this.validate}
                isAuthenticated={isAuthenticated}
                loading={loading}
                handleSubmit={isAuthenticated ? reauthLogin : login}
                username={(user || {}).username}
              />
            </div>
          );
        }}
      </Subscribe>
    );
  }
}

Login.propTypes = {
  style: PropTypes.object
};

export default Login;
