import React from 'react';
import PropTypes from 'prop-types';

import { CardHeader, IconButton, Menu, MenuItem, Divider } from '@material-ui/core';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';

import styles from './appCardHeader.module.scss';

const options = ['Expand All', 'Collapse All', 'Clear'];

const AppCardHeader = ({
  title,
  subheader,
  handleMenuClick,
  handleMenuOpen,
  handleMenuClose,
  anchorEl,
}) => {
  const open = Boolean(anchorEl);

  return (
    <CardHeader
      action={
        <div>
          <IconButton
            aria-label="More"
            aria-owns={open ? 'long-menu' : null}
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                maxHeight: 200,
                width: 200,
              },
            }}
          >
            {options.map(option => {
              return (
                <div key={option}>
                  {option === 'Clear' && <Divider />}
                  <MenuItem onClick={handleMenuClick(option)}>{option}</MenuItem>
                </div>
              );
            })}
          </Menu>
        </div>
      }
      title={title}
      subheader={subheader}
      className={styles.headerShadow}
    />
  );
};

AppCardHeader.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  handleMenuOpen: PropTypes.func,
  handleMenuClose: PropTypes.func,
  handleMenuClick: PropTypes.func,
  anchorEl: PropTypes.object,
};

export default AppCardHeader;
