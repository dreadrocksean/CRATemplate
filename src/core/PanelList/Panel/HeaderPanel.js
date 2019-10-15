import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ExpansionPanelSummary, Typography } from '@material-ui/core';

import styles from './headerPanel.module.scss';

const HeaderPanel = ({ headings }) => (
  <ExpansionPanelSummary classes={{ root: styles.root }}>
    {headings.map((heading, i) => (
      <Typography key={i} className={classNames(styles.heading, styles.hColumn)}>
        {heading}
      </Typography>
    ))}
  </ExpansionPanelSummary>
);

HeaderPanel.propTypes = {
  // classes: PropTypes.object,
  headings: PropTypes.array,
};

export default HeaderPanel;
