import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Grid, Button, Icon } from '@material-ui/core';

const styles = () => ({
  button: {
    maxWidth: '100%',
  },
  serialNumberContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '1rem',
  },
  serialNumberField: {
    display: 'flex',
    alignItems: 'center',
    background: '#fff',
    borderRadius: '3px',
    boxShadow: '0 1px 3px -1px rgba(0,0,0,0.7)',
    padding: 12,
  },
  close: {
    cursor: 'pointer',
    color: '#a0a0a0',
    marginTop: '8px',
    '&:hover': {
      color: 'grey',
    },
  },
});

const SerialNumberForm = props => (
  <Grid container spacing={24} className={props.classes.serialNumberContainer}>
    <Grid item xs={12} md={8}>
      <div className={props.classes.serialNumberField}>
        <TextField
          id="serial"
          label="Serial Number"
          value={props.value || ''}
          placeholder="Enter A Serial Number"
          onChange={props.onChange}
          fullWidth
        />
      </div>
    </Grid>
    <Grid item xs={6} md={3}>
      <Button
        color="secondary"
        size="large"
        fullWidth
        variant="contained"
        component="span"
        className={props.classes.button}
        onClick={props.onSubmit}
      >
        Add
      </Button>
    </Grid>
    <Grid item xs={2} md={1}>
      <Icon onClick={props.onCancel} className={props.classes.close}>
        close
      </Icon>
    </Grid>
  </Grid>
);

SerialNumberForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  loading: PropTypes.bool,
};

export default withStyles(styles)(SerialNumberForm);
