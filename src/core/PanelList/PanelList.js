import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
// import { Transition } from 'react-spring';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Panel from './Panel';
import PendingPanel from './Panel/PendingPanel';
import HeaderPanel from './Panel/HeaderPanel';
// import Delayed from '../Delayed';

import styles from './PanelList.module.scss';

const PanelList = memo(
  ({ onChange, itemList = [], pendingList = [], expanded, removeItem, removePending, addItem }) => {
    // const f = (item, state, index) => props => ReactNode;
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          {pendingList.map((item, i) => (
            <PendingPanel
              key={i}
              text={item.serialNumber}
              errorMessage={item.errorMessage}
              pending={item.pending}
              remove={removePending}
              toBeRemoved={item.toBeRemoved}
              retry={addItem}
            />
          ))}
        </Grid>
        <Grid item xs={12}>
          {itemList.length > 0 && <HeaderPanel headings={Object.keys(itemList[0].summaryData)} />}

          <div className={styles.panelsContainer}>
            {itemList
              .filter(v => v)
              .map((item, i) => {
                // -1: collapse all, 0: expand all, n: expand n
                const expand = (expanded === 0 || expanded === i + 1) && expanded !== -1;
                return (
                  <Panel
                    key={i + 1} // Leave zero available
                    index={i}
                    data={item}
                    itemFields={itemList.itemFields}
                    expanded={expand}
                    onChange={onChange(i + 1)}
                    removeItem={removeItem}
                    toBeRemoved={item.toBeRemoved}
                  />
                );
              })}
          </div>
        </Grid>
      </Grid>
    );
  }
);

PanelList.displayName = '';

PanelList.propTypes = {
  itemList: PropTypes.array.isRequired,
  pendingList: PropTypes.array,
  expanded: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  removeItem: PropTypes.func,
  removePending: PropTypes.func,
  addItem: PropTypes.func,
};

export default PanelList;
