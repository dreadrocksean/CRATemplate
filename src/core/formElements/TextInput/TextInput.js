import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { validator, validatorMap } from './validator';
import { formInputMap } from './attributeMaps';

import styles from './textInput.module.scss';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validating: false,
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderValidationHelp = this.renderValidationHelp.bind(this);
  }

  handleBlur() {
    this.setState({ validating: true });
  }

  handleChange(e) {
    this.props.handleChange(e, this.props.type);
  }

  getName() {
    const inputFormat = formInputMap(this.props.type);
    return (this.props.name || inputFormat.name).replace(/\b\w/g, l => l.toUpperCase()) || '';
  }

  getValidationMsg() {
    return `Not a valid ${this.props.type}`;
  }

  renderValidationHelp() {
    let msg =
      this.props.validator !== false && !this.props.value
        ? "Can't be empty"
        : this.getValidationMsg();
    const pattern = this.props.validator || validatorMap[this.props.type];
    if (this.state.validating && !validator(this.props.value, pattern)) {
      return <div className={styles.validationHelp}>{msg}</div>;
    }
  }

  render() {
    const { value, hidden } = this.props;
    const { type, autoComplete, name } = formInputMap(this.props.type);
    const fieldName = (this.props.name || name).replace(/\b\w/g, l => l.toUpperCase()) || '';

    return (
      <div className={styles.textInput}>
        <label>
          {!hidden && name}
          <input
            type={type}
            name={fieldName}
            format={type}
            autoComplete={autoComplete}
            value={value}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            hidden={hidden}
          />
          {this.renderValidationHelp()}
        </label>
      </div>
    );
  }
}

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  hidden: PropTypes.bool,
  name: PropTypes.string,
  validator: PropTypes.string,
};

export default TextInput;
