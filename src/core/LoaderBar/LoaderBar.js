import React from 'react';
import { Grid } from '@material-ui/core';

import styles from './loaderBar.module.scss';

const LoaderBar = () => (
  <Grid container spacing={3} justify="center">
    <Grid item xs={12} md={8}>
      <div className={styles.loaderBarContainer}>
        <h2>Loading&hellip;</h2>
        <div className={styles.loaderBar} />
        <p>(This may take a minute.)</p>
      </div>
    </Grid>
  </Grid>
);

export default LoaderBar;
