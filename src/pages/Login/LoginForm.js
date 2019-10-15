import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import AppText from "../../core/AppText";
import TextInput from "../../core/formElements/TextInput";
import AppButton from "../../core/AppButton";

import Logo from "../../assets/images/SDlogo.png";

import styles from "./login.module.scss";

const appName = process.env.REACT_APP_APPNAME;

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", submitText: "Log In" };
    this.interval = null;
  }

  componentWillUnmount() {
    this.cancelLoadingAnimation();
  }

  componentDidUpdate(prevProps) {
    if (this.props.loading !== prevProps.loading) {
      if (this.props.loading) this.beginLoadingAnimation();
      else
        this.cancelLoadingAnimation(() =>
          this.setState({ submitText: "Log In" })
        );
    }
  }

  cancelLoadingAnimation(cb = () => {}) {
    clearInterval(this.interval);
    this.interval = null;
    cb();
  }

  beginLoadingAnimation() {
    let dotCount = 0;
    if (this.interval) return;

    this.interval = setInterval(() => {
      const dots = [...Array(dotCount)].map(() => " .").join("");
      this.setState({ submitText: `Logging In${dots}` });
      dotCount = ++dotCount % 4;
    }, 400);
  }

  handleChange = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSubmit({
      username: this.state.username,
      password: this.state.password
    });
  };

  render() {
    const { isAuthenticated, location, loading } = this.props;
    const { password } = this.state;
    return (
      <Card
        className={`${styles.loginFormWrapper} ${
          loading ? styles.loading : ""
        }`}
      >
        <CardContent>
          <div className={styles.formTitle}>
            {isAuthenticated ? (
              <div>
                <h2>Session Expired</h2>
                <p>
                  For your security, please re-enter your password to continue.
                </p>
              </div>
            ) : (
              <div>
                <a className={styles.logo} href={location}>
                  <img src={Logo} alt="MetroNet Logo" width="150" />
                </a>
                <AppText>
                  <h2>{appName}</h2>
                </AppText>
              </div>
            )}
          </div>

          <form
            className={styles.loginForm}
            data-validate-wrapper
            onSubmit={this.handleSubmit}
          >
            {!isAuthenticated ? (
              <TextInput
                type="username"
                value={this.state.username}
                handleChange={this.handleChange}
              />
            ) : (
              <div>
                <TextInput
                  type="username"
                  hidden
                  value={this.props.username} // From AuthStore
                  handleChange={this.handleChange}
                />
                <div>{this.props.username}</div>
              </div>
            )}
            <TextInput
              type="password"
              value={password}
              handleChange={this.handleChange}
            />

            <div className={styles.formActions}>
              {isAuthenticated ? (
                <AppButton type="submit" value="Continue" />
              ) : (
                <AppButton type="submit" value={this.state.submitText} />
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }
}

LoginForm.propTypes = {
  location: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func,
  username: PropTypes.string
};

export default LoginForm;
