import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect, __RouterContext } from "react-router-dom";

import { useTransition, animated } from "react-spring";

import withUnstated from "../../core/WithUnstated";

import Dashboard from "../../pages/Dashboard";
import Login from "../../pages/Login";
import AssignContainer from "../../pages/Assign";
import Returns from "../../pages/Returns";
import Auth from "../../pages/Auth";
import NotFound from "../../pages/NotFound";
import { SUBDIRECTORY } from "../../utils/config";

// import styles from './Main.module.scss';

const Main = ({
  store: {
    state: {
      network,
      auth: { isAuthenticated, user }
    }
  }
}) => {
  console.log("__RouterContext: ", __RouterContext);
  const { location } = useContext(__RouterContext);
  console.log("location: ", location);
  const transitions = useTransition(location, location => location.pathname, {
    initial: { transform: "translate3d(0, 0%,0)" },
    from: {
      opacity: 0,
      transform: "translate3d(100%,0,0)"
    },
    enter: {
      opacity: 1,
      transform: "translate3d(0%,0,0)"
    },
    leave: {
      opacity: 0,
      transform: "translate3d(-100%,0,0)"
    }
  });

  console.log("SUBDIRECTORY", SUBDIRECTORY);
  if (!network) return null;

  const renderRoutes = item => {
    if (typeof isAuthenticated === "undefined") {
      console.log("isAuthenticated: ", undefined);
      return (
        <Switch location={item}>
          <Route path={`${SUBDIRECTORY}`} component={Auth} />
          <Route component={NotFound} />
        </Switch>
      );
    }
    if (!user || !isAuthenticated) {
      console.log("isAuthenticated: ", isAuthenticated);
      console.log("user: ", user);
      return (
        <Switch location={item}>
          <Route path={`${SUBDIRECTORY}/login`} component={Login} />
          <Redirect to={`${SUBDIRECTORY}/login`} />
        </Switch>
      );
    }
    console.log("isAuthenticated: ", isAuthenticated);
    return (
      <Switch location={item}>
        <Route exact path={`${SUBDIRECTORY}/`} component={Dashboard} />
        <Route path={`${SUBDIRECTORY}/login`} component={Login} />

        {/*---------- Add Custom Routes Here ----------*/}
        <Route path={`${SUBDIRECTORY}/assign`} component={AssignContainer} />
        <Route path={`${SUBDIRECTORY}/returns`} component={Returns} />
        {/*------------ End Custom Routes ------------*/}

        <Route path={`${SUBDIRECTORY}/auth`} component={Auth} />
        <Redirect from={`${SUBDIRECTORY}/`} to={`${SUBDIRECTORY}/login`} />
      </Switch>
    );
  };

  return transitions.map(({ item, props, key }) => (
    <div key={key}>
      <animated.div
        style={{
          ...props,
          height: "100%",
          width: "100%",
          position: "absolute"
        }}
      >
        {renderRoutes(item)}
      </animated.div>
    </div>
  ));
};

Main.propTypes = {
  style: PropTypes.object
};

export default withUnstated(Main);
