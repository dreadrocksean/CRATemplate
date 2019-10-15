import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Grid, Card, CardContent, Typography } from '@material-ui/core';
// import { withStyles } from '@material-ui/core/styles';

import { SUBDIRECTORY } from '../../../utils/config';
import styles from './DashboardItem.module.scss';

class DashboardItem extends Component {
  state = { hover: false };
  onMouseEnter = this.onMouseEnter.bind(this);
  onMouseLeave = this.onMouseLeave.bind(this);

  onMouseEnter() {
    if (!this.props.appRoute) return;
    this.setState({ hover: true });
  }

  onMouseLeave() {
    this.setState({ hover: false });
  }

  makeLink(card) {
    const { appRoute } = this.props;
    return appRoute ? <Link to={`${SUBDIRECTORY}${appRoute}`}>{card}</Link> : card;
  }

  render() {
    const { appName, appRoute } = this.props;
    return (
      <Grid
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        item
        xs={12}
        sm={6}
        md={3}
        className={styles.dashboardItem}
      >
        {this.makeLink(
          <Card
            className={`${!appRoute ? styles.disabled : ''}`}
            classes={{ root: styles.root }}
            raised={this.state.hover}
          >
            <CardContent classes={{ root: styles.flex }}>
              <Typography color="secondary" align="center" variant="subtitle1">
                {appName || 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Grid>
    );
  }
}

DashboardItem.propTypes = {
  classes: PropTypes.object,
  appRoute: PropTypes.string,
  appName: PropTypes.string,
};

export default DashboardItem;
