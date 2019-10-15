import React, { Component } from 'react';
import { Subscribe } from 'unstated';

import MainStore from '../stores/MainStore';

const withUnstated = (WrappedComponent, Store = MainStore, navigationOptions) =>
  class WithUnstated extends Component {
    static navigationOptions = navigationOptions;
    render() {
      return (
        <Subscribe to={[Store]}>
          {store => <WrappedComponent {...store.state} store={store} {...this.props} />}
        </Subscribe>
      );
    }
  };

export default withUnstated;
