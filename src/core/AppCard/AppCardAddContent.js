import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { TextField, Grid, Button, Icon } from '@material-ui/core';
import { animated } from 'react-spring';

import styles from './appCardAddContent.module.scss';

class AppCardAddContent extends PureComponent {
  state = { showForm: false };

  showForm = open => () => {
    this.setState({ showForm: open });
    if (open) return;
    this.props.onCancel(this.props.textFields);
  };

  render() {
    const { children } = this.props;
    const { showForm } = typeof this.props.showForm === 'undefined' ? this.state : this.props;
    const buttonVals = {
      text: showForm ? 'Close Form' : 'Open Form',
      icon: showForm ? 'remove_circle' : 'add_circle',
    };
    // const l = this.props.textFields.length + (children || []).length;
    // const w = Math.max(Math.min(Math.floor(12 / l), 3), 2);
    return (
      <Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h2 className={styles.h2}>{this.props.formName}</h2>
          </Grid>
          <Grid item xs={12}>
            <Button
              classes={{ root: styles.openButton }}
              size="small"
              color="primary"
              onClick={this.showForm(!showForm)}
            >
              <Icon className={styles.addIcon}>{buttonVals.icon}</Icon> {buttonVals.text}
            </Button>
          </Grid>
        </Grid>
        <animated.div className={styles.formWrapper}>
          {showForm && (
            <form onSubmit={this.props.onSubmit}>
              <Grid container className={styles.fields} spacing={24}>
                {this.props.textFields.map((field, i) => (
                  <Grid key={i} item xs={12} sm={6}>
                    <div className={styles.textfield}>
                      <TextField
                        inputProps={{ style: { height: 'auto' } }}
                        id={field.name}
                        label={field.label}
                        placeholder={field.label}
                        value={this.props.values[field.name] || ''}
                        onChange={this.props.onChange(field.name)}
                        fullWidth
                      />
                    </div>
                  </Grid>
                ))}
                {children &&
                  children.map((el, i) => (
                    <Grid key={i} item xs={12} sm={6}>
                      {el}
                    </Grid>
                  ))}
                <Grid item xs={6} md={4}>
                  <Button
                    type="submit"
                    color="secondary"
                    size="large"
                    fullWidth
                    variant="contained"
                    component="span"
                    className={styles.button}
                    onClick={this.props.onSubmit}
                  >
                    {this.props.submitText || 'Find'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </animated.div>
      </Fragment>
    );
  }
}

AppCardAddContent.propTypes = {
  values: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  textFields: PropTypes.array.isRequired,
  submitText: PropTypes.string,
  formName: PropTypes.string,
  showForm: PropTypes.bool,
  children: PropTypes.array,
};

export default AppCardAddContent;
