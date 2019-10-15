import React from 'react';
import { Subscribe } from 'unstated';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

import MainStore from '../../stores/MainStore';
import StatusMessage from '../../containers/StatusMessage';
import { StatusMessageEnum as Enum } from '../../utils';
import { dashboardSections as sections } from '../../data';

import DashboardItem from './DashboardItem';
import styles from './Dashboard.module.scss';

const Dashboard = ({ style }) => (
  <Subscribe to={[MainStore]}>
    {({ auth: { error } }) => {
      if (error) {
        return <StatusMessage level={Enum.ERROR}>Error logging out</StatusMessage>;
      }

      const dummyData = section => {
        const min = 0;
        const length = section.apps.length;
        return [...Array(Math.max(min, length) - length)].map(() => {
          return { appName: null, appLink: null, image: null };
        });
      };

      const getSections = () =>
        sections.map((section, i) => (
          <section key={i} className={styles.section}>
            <h2>{section.name}</h2>
            <Grid container spacing={10} className={styles.grid}>
              {[...section.apps, ...dummyData(section)].map((item, i) => (
                <DashboardItem key={i} appRoute={item.route} appName={item.name} />
              ))}
            </Grid>
          </section>
        ));
      return (
        <div className={styles.dashboard} style={style}>
          {getSections()}
        </div>
      );
    }}
  </Subscribe>
);

Dashboard.propTypes = {
  style: PropTypes.object,
};

export default Dashboard;
