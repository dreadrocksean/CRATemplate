import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Subscribe } from 'unstated';
// import { Transition, config } from 'react-spring';

import { SUBDIRECTORY } from '../../utils/config';
import MainStore from '../../stores/MainStore';
import Assign from './Assign';
import AssignChild from './AssignChild';
import Batch from './Batch';

class AssignContainer extends Component {
  render() {
    return (
      <Subscribe to={[MainStore]}>
        {main => (
          <Switch>
            <Route
              exact
              path={`${SUBDIRECTORY}/assign`}
              render={props => (
                <Assign {...props} {...main.tech} {...main.equipment} {...main.batch} />
              )}
            />
            <Route
              path={`${SUBDIRECTORY}/assign/batch`}
              render={props => <Batch {...props} {...main.batch} {...main.tech} />}
            />
            <Route path={`${SUBDIRECTORY}/assign/:number`} component={AssignChild} />
          </Switch>
        )}
      </Subscribe>
    );
  }
}

export default AssignContainer;
