import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Subscribe } from 'unstated';

import { CardContent } from '@material-ui/core';

import MainStore from '../../stores/MainStore';
import PanelList from '../PanelList';

import styles from './appCardContent.module.scss';

class AppCardContent extends PureComponent {
  state = {
    edit: false,
    autoScroll: null,
    scrollShadow: false,
  };

  _timeout = null;

  componentWillUnmount() {
    if (this.autoScroll) this.autoScroll.removeEventListener('scroll', this.handleScroll);
  }

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
    const { subStore, scroll, expanded, onPanelChange } = this.props;

    return (
      <CardContent className={styles.content}>
        <div className={scroll ? styles.contentScroll : ''} ref={node => (this.autoScroll = node)}>
          <Subscribe to={[MainStore]}>
            {({
              [subStore]: { removeItem, addSerialNumber, removePending },
              state: {
                [subStore]: { itemList, pendingList },
              },
            }) => {
              return (
                (!!(itemList || []).length || !!(pendingList || []).length) && (
                  <PanelList
                    itemList={itemList}
                    pendingList={pendingList}
                    expanded={expanded}
                    onChange={onPanelChange}
                    removeItem={removeItem}
                    removePending={removePending}
                    addItem={addSerialNumber}
                  />
                )
              );
            }}
          </Subscribe>
        </div>
      </CardContent>
    );
  }
}

AppCardContent.propTypes = {
  error: PropTypes.object,
  subStore: PropTypes.string,
  scroll: PropTypes.bool,
  expanded: PropTypes.number,
  onPanelChange: PropTypes.func,
};

export default AppCardContent;
