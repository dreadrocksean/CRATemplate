import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions } from '@material-ui/core';

import AppCardHeader from './AppCardHeader';
import AppCardContent from './AppCardContent';

import styles from './appCard.module.scss';

class AppCard extends PureComponent {
  state = {
    edit: false,
    autoScroll: null,
    scrollShadow: false,
    anchorEl: null,
    collapseAll: null,
    expandAll: null,
    expanded: -1,
  };

  _timeout = null;

  componentWillUnmount() {
    if (this.autoScroll) this.autoScroll.removeEventListener('scroll', this.handleScroll);
  }

  onPanelChange = panel => (e, expanded) => {
    this.setState({ expanded: expanded ? panel : null });
  };

  onExpandAll = () => this.setState({ expandAll: true, collapseAll: null, expanded: 0 });

  onCollapseAll = () => this.setState({ collapseAll: true, expandAll: null, expanded: -1 });

  onClear = () => {
    this.setState({ selectedTechOption: null });
    this.props.onClear();
  };

  handleMenuClick = option => () => {
    this.handleMenuClose();
    switch (option) {
      case 'Clear':
        return this.onClear();
      case 'Expand All':
        return this.onExpandAll();
      case 'Collapse All':
        return this.onCollapseAll();
      default:
        break;
    }
  };

  handleMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleScroll = () => {
    clearTimeout(this._timeout);

    this._timeout = setTimeout(() => {
      this._timeout = null;
      this.setState({ scrolling: false });
    }, 1000);

    if ((this.autoScroll || {}).scrollTop > 16) {
      this.setState({ scrollShadow: true });
    } else this.setState({ scrollShadow: false });
    this.setState({ scrolling: true });
  };

  render() {
    const { subStore, appCardTitle, appCardSubtitle, children, style } = this.props;

    const headerShadow = `${styles.header} ${this.state.scrollShadow ? styles.headerShadow : ''}`;

    return (
      <div style={style}>
        <Card className={styles.root}>
          <AppCardHeader
            title={appCardTitle}
            subheader={appCardSubtitle}
            className={headerShadow}
            handleMenuOpen={this.handleMenuOpen}
            handleMenuClose={this.handleMenuClose}
            handleMenuClick={this.handleMenuClick}
            anchorEl={this.state.anchorEl}
          />

          <AppCardContent
            subStore={subStore}
            scroll={this.state.edit}
            expanded={this.state.expanded}
            onPanelChange={this.onPanelChange}
          />

          <CardActions className={styles.footer}>{children}</CardActions>
        </Card>
      </div>
    );
  }
}

AppCard.propTypes = {
  subStore: PropTypes.string.isRequired,
  loading: PropTypes.object,
  error: PropTypes.object,
  style: PropTypes.object,
  onClear: PropTypes.func,
  appCardTitle: PropTypes.string,
  appCardSubtitle: PropTypes.string,
  children: PropTypes.array,
};

export default AppCard;
