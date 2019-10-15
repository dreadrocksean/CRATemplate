import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ExpansionPanelDetails, Typography, Icon } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import styles from './detailItem.module.scss';

class DetailItem extends PureComponent {
  state = {
    opened: undefined,
  };

  handleTooltipClose = () => {
    this.setState({ opened: undefined });
  };

  handleTooltipOpen = i => () => {
    this.setState({ opened: i });
  };

  render() {
    const { item, removeItem, isAvailable } = this.props;
    const keys = Object.keys(item);
    const len = keys.length;
    return (
      <ExpansionPanelDetails className={styles.root}>
        {!isAvailable && (
          <div className={styles.errorOverlay}>
            <Typography className={styles.errorMessage} variant="headline">
              Not Available!
            </Typography>
          </div>
        )}
        {keys.map(
          (k, i) =>
            item[k] && (
              <ClickAwayListener key={i} onClickAway={this.handleTooltipClose}>
                <Tooltip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  onClose={this.handleTooltipClose}
                  open={this.state.opened === i}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  placement="bottom"
                  classes={{
                    tooltip: styles.tooltip,
                  }}
                  title={item[k]}
                >
                  <Typography
                    style={{ flexBasis: `${100 / len}%` }}
                    className={!isAvailable ? styles.errorText : styles.text}
                    variant="subheading"
                    onClick={this.handleTooltipOpen(i)}
                  >
                    {item[k]}
                  </Typography>
                </Tooltip>
              </ClickAwayListener>
            )
        )}

        {removeItem && (
          <Icon className={styles.icon} onClick={removeItem}>
            close
          </Icon>
        )}
      </ExpansionPanelDetails>
    );
  }
}

DetailItem.propTypes = {
  item: PropTypes.object,
  isAvailable: PropTypes.bool,
  removeItem: PropTypes.func,
};

export default DetailItem;
