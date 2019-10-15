import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@material-ui/core';

// import styles from './Navigation.scss';

const items = [];
const columns = 12;

class Navigation extends Component {
  renderItem(item, i) {
    const count = items.length;
    const autoLayout = columns % count !== 0;
    const el = autoLayout ? (
      <NavLink key={i} to={item.link}>
        <Button variant="contained" color="primary">
          {item.name}
        </Button>
      </NavLink>
    ) : (
      <NavLink key={i} to={item.link}>
        <Button variant="contained" color="primary">
          {item.name}
        </Button>
      </NavLink>
    );
    return el;
  }

  renderItems() {
    return items.map((item, i) => this.renderItem(item, i));
  }

  render() {
    return this.renderItems();
  }
}

export default Navigation;
