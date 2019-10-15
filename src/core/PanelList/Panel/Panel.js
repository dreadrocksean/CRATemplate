import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  Divider,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { animated } from 'react-spring';

// import { animationStyles } from '../../../data';

import Detail from './PanelDetail';
// import Delayed from '../../Delayed';

import styles from './panel.module.scss';

const Panel = memo(
  ({ data, itemFields, expanded, onChange, removeItem, inlineStyle /*index*/ }) => (
    <animated.div>
      <ExpansionPanel
        className={styles.root}
        expanded={expanded}
        onChange={onChange}
        style={inlineStyle}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          {Object.keys(data.summaryData).map((k, i) => {
            const value = Array.isArray(data.summaryData[k])
              ? data.summaryData[k].map((v, i) => (
                  <span className={styles.stats} key={i}>
                    <Icon classes={{ root: styles.icon }}>{v.icon}</Icon>
                    <span className={styles.count}>{v.value}</span>
                  </span>
                ))
              : data.summaryData[k];
            return (
              <div key={i} className={styles.hColumn}>
                <Typography className={styles.heading}>{value}</Typography>
              </div>
            );
          })}
        </ExpansionPanelSummary>
        <Detail items={data.items} itemFields={itemFields} removeItem={removeItem} />

        <Divider />
      </ExpansionPanel>
    </animated.div>
  )
);

Panel.displayName = '';

Panel.propTypes = {
  classes: PropTypes.object,
  inlineStyle: PropTypes.object,
  onChange: PropTypes.func,
  removeItem: PropTypes.func,
  data: PropTypes.object,
  itemFields: PropTypes.array,
  expanded: PropTypes.bool,
  index: PropTypes.number,
};

export default Panel;
