import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { __RouterContext } from 'react-router';

import styles from './subMenu.module.scss';

const getLink = (crumbs, index) => {
  const links = [];
  crumbs.forEach((v, i) => {
    if (i <= index) links.push(v);
  });
  return `/${links.join('/')}`;
};

const SubMenu = () => {
  console.log('__RouterContext: ', __RouterContext);
  const context = useContext(__RouterContext);
  console.log('context: ', context);
  const location = context.location;
  const pathname = location.pathname;
  const crumbs = pathname.split('/').splice(1);
  return (
    <div className={styles.subMenu}>
      {crumbs.map((crumb, i) => (
        <Fragment key={i}>
          {i > 0 && <span>{`>>`}</span>}
          <span>
            <Link to={getLink(crumbs, i)}>{crumb}</Link>
          </span>
        </Fragment>
      ))}
    </div>
  );
};

SubMenu.propTypes = {
  location: PropTypes.object,
};

export default SubMenu;
