import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ExpansionPanelDetails, Typography } from '@material-ui/core';

import styles from './detailHeader.module.scss';

const DetailHeader = ({ subHeadings }) => (
  <ExpansionPanelDetails className={classNames(styles.root, styles.subHeading)}>
    {subHeadings.map((cat, i) => (
      <Typography
        key={i}
        className={styles.text}
        style={{ flexBasis: `${100 / subHeadings.length}%` }}
        variant="caption"
      >
        {cat}
      </Typography>
    ))}
  </ExpansionPanelDetails>
);

DetailHeader.propTypes = {
  subHeadings: PropTypes.array,
};

export default DetailHeader;
