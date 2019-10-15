import React from 'react';
import { Route, Redirect, Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SUBDIRECTORY } from '../../utils/config';

export const AppLink = ({ to, children }) => <Link to={`${SUBDIRECTORY}${to}`}>{[children]}</Link>;

export const AppRedirect = ({ noSub, from, to, children }) => {
  const newTo = noSub ? to : `${SUBDIRECTORY}${to}`;
  const newFrom = noSub ? from : `${SUBDIRECTORY}${from}`;
  return (
    <Redirect from={newFrom} to={newTo}>
      {[children]}
    </Redirect>
  );
};

export const AppRoute = ({ exact, path, component, noSub }) => {
  const newPath = noSub ? path : `${SUBDIRECTORY}${path}`;
  return <Route exact={exact} path={newPath} component={component} />;
};

export const AppNavLink = ({ to, children }) => (
  <NavLink to={`${SUBDIRECTORY}${to}`}>{[children]}</NavLink>
);

AppLink.propTypes = {
  children: PropTypes.array,
  to: PropTypes.string,
};

AppRedirect.propTypes = {
  children: PropTypes.array,
  from: PropTypes.string,
  to: PropTypes.string,
  noSub: PropTypes.bool,
};

AppRoute.propTypes = {
  component: PropTypes.func,
  path: PropTypes.string,
  exact: PropTypes.bool,
  noSub: PropTypes.bool,
};

AppNavLink.propTypes = {
  children: PropTypes.array,
  to: PropTypes.string,
};
